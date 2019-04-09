import { ajax } from 'rxjs/ajax'
import { switchMap, catchError, tap, throttleTime } from 'rxjs/operators'
import { ServiceRoute, Injectable } from 'vue-service-app'
import { Action } from 'rx-state'
import { EMPTY } from 'rxjs'
import { AppConfig } from '@/constants/config'

/**
 * 热更新服务
 */
@Injectable()
export class HotReleaseService {
  reloadAction$: Action<any>

  constructor(private appConfig: AppConfig) {
    this.reloadAction$ = new Action(data$ =>
      data$.pipe(
        throttleTime(10000),
        // 捕获子流的错误 错误冒泡会导致父流中断
        switchMap(() =>
          ajax
            .get(`/release.json?${new Date().getTime()}`)
            .pipe(catchError(() => EMPTY))
        ),
        tap(({ response }) => {
          if (response.git_commit !== this.appConfig.GIT_COMMIT) {
            console.log(
              '需要刷新页面',
              'GIT_COMMIT：',
              this.appConfig.GIT_COMMIT,
              response.git_commit,
              'release.commit：'
            )
            console.log('延迟更新成功')
            if (this.appConfig.IS_PROD) {
              document.location.reload()
            }
          }
        })
      )
    )
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: Function) {
    const suffix = new Date().getTime()
    this.reloadAction$.dispatch({ tip: 'release' })
    next()
  }
}
