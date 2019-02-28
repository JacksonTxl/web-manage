import { timer, Observable } from 'rxjs'
import { retryWhen, delayWhen, scan } from 'rxjs/operators'

const IGNORE_RETRY_STATUS = [400, 401, 403, 404, 500]
/**
 * 递增延迟http重试请求操作符 {重试次数，重试递增时间}
 */
export const ajaxRetry = (count = 0, delayTime = 0) => (
  source$: Observable<any>
) => {
  return source$.pipe(
    retryWhen(err$ =>
      err$
        .pipe(
          scan((errCount, err: any) => {
            /**
             * 400 401 403 404 500 状态吗时直接抛出
             */
            if (
              err.name === 'AjaxError' &&
              IGNORE_RETRY_STATUS.includes(err.status)
            ) {
              throw err
            }
            /**
             * 超过重试次数 抛出
             */
            if (errCount >= count) {
              throw err
            }

            return errCount + 1
          }, 0)
        )
        /**
         * 延迟重试
         */
        .pipe(
          delayWhen(errCount => {
            return timer(errCount * delayTime)
          })
        )
    )
  )
}
