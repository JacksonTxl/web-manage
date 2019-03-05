import { http } from '@/services/http.service'
import { debounceTime } from 'rxjs/operators'
import { RouteGuard, ServiceRoute } from 'vue-service-app'
const git = require('git-rev-sync')

class HotReleaseService implements RouteGuard {
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: Function) {
    // const suffix = new Date().getTime()
    // http.get(`/release.json?${suffix}`)
    //   .pipe(
    //     debounceTime(1000)
    //   ).subscribe(releaseJSON => {
    //     if (releaseJSON.commit !== git.short()) {
    //       console.log(
    //         '需要刷新页面',
    //         'GIT_COMMIT：',
    //         git.short(),
    //         'release.commit：'
    //       )
    //       if (process.env.NODE_ENV === 'production') {
    //         document.location.reload()
    //       }
    //     }
    //   })
    next()
  }
}
export const hotReleaseService = new HotReleaseService()
