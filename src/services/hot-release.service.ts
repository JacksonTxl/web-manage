import { ajax } from 'rxjs/ajax'
import { debounceTime } from 'rxjs/operators'

import { RouteGuard, ServiceRoute } from 'vue-service-app'

export class HotReleaseService implements RouteGuard {
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: Function) {
    console.log('hotReleaseService start')
    const suffix = new Date().getTime()
    const env = process.env
    ajax.get(`/release.json?${suffix}`)
      .pipe(
        debounceTime(1000)
      ).subscribe(({ response }) => {
        if (response.git_commit !== env.GIT_COMMIT) {
          console.log(
            '需要刷新页面',
            'GIT_COMMIT：',
            env.GIT_COMMIT,
            'release.commit：'
          )
          if (env.NODE_ENV === 'production') {
            document.location.reload()
          }
        }
      })
    next()
  }
}
