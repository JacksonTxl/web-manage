import { timer, Observable } from 'rxjs'
import { retryWhen, delayWhen, scan, catchError } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'

const IGNORE_RETRY_STATUS = [400, 401, 403, 404]
/**
 * 递增延迟http重试请求操作符 {重试次数，重试递增时间}
 */
export const ajaxRetry = (count = 0, delayTime = 0) => (
  source$: Observable<any>
) => {
  return source$
    .pipe(
      retryWhen(err$ =>
        err$.pipe(
          scan((errCount, err: any) => {
            if (
              err.name === 'AjaxError' &&
              IGNORE_RETRY_STATUS.indexOf(err.status) > -1
            ) {
              throw err
            }
            if (errCount >= count) {
              throw err
            }
            return errCount + 1
          }, 0)
        )
      )
    )
    .pipe(delayWhen(errCount => timer(errCount * delayTime)))
}
