import { ajax } from 'rxjs/ajax'
import { switchMap, catchError, tap, throttleTime } from 'rxjs/operators'
import { ServiceRoute, Injectable } from 'vue-service-app'
import { Action } from 'rx-state'
import { EMPTY } from 'rxjs'
import { AppConfig } from '@/constants/config'
import { NProgressService } from './nprogress.service'

/**
 * 热更新服务
 */
@Injectable()
export class HotReleaseService {
  reloadAction$: Action<any>

  constructor(
    private appConfig: AppConfig,
    private nProgressService: NProgressService
  ) {
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
            if (this.appConfig.IS_PROD) {
              document.location.reload()
            }
          }
        })
      )
    )
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: Function) {
    this.nProgressService.SET_TEXT('版本更新服务开始')
    this.reloadAction$.dispatch({ tip: 'release' })
    this.reloadAction$.subscribe(() => {
      this.nProgressService.SET_TEXT('版本更新服务完毕')
      next()
    })
  }
}
