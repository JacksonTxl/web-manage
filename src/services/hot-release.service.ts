import { ajax } from 'rxjs/ajax'
import { debounceTime, switchMap, catchError, tap } from 'rxjs/operators'
import { RouteGuard, ServiceRoute } from 'vue-service-app'
import { appConfig } from '@/constants/config'
import { Action } from 'rx-state/src'
import { EMPTY } from 'rxjs'

export class HotReleaseService implements RouteGuard {
  appConfig = appConfig

  private reload$ = new Action(data$ =>
    data$.pipe(
      debounceTime(1000),
      // 捕获子流的错误 错误冒泡会导致父流中断
      switchMap(() =>
        ajax.get(`/release.json?${new Date().getTime()}`).pipe(catchError(() => EMPTY))
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
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: Function) {
    console.log('hotReleaseService start')
    const suffix = new Date().getTime()
    this.reload$.dispatch({ tip: 'release' })
    next()
  }
}
