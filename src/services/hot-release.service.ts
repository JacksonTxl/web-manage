import { ajax } from 'rxjs/ajax'
import { debounceTime } from 'rxjs/operators'
import { RouteGuard, ServiceRoute } from 'vue-service-app'
import { appConfig } from '@/constants/config'

export class HotReleaseService implements RouteGuard {
  appConfig = appConfig
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: Function) {
    console.log('hotReleaseService start')
    const suffix = new Date().getTime()
    ajax
      .get(`/release.json?${suffix}`)
      .pipe(debounceTime(1000))
      .subscribe(({ response }) => {
        if (response.git_commit !== this.appConfig.GIT_COMMIT) {
          console.log(
            '需要刷新页面',
            'GIT_COMMIT：',
            this.appConfig.GIT_COMMIT,
            'release.commit：'
          )
          if (this.appConfig.IS_PROD) {
            document.location.reload()
          }
        }
      })
    next()
  }
}
