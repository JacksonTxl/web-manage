import { Injectable, ServiceRouter, ServiceRoute } from 'vue-service-app'
import { Location } from 'vue-router'
import { Observable, onErrorResumeNext } from 'rxjs'

interface RedirectConfig {
  locateRouteName: string
  redirectRoute: string | Location
}
/**
 * 负责应用跳转 包含tab等
 */
@Injectable()
export class RedirectService {
  constructor(private router: ServiceRouter) {}
  redirect(redirectConfig: RedirectConfig) {
    if (this.router.to.name === redirectConfig.locateRouteName) {
      this.router.next(redirectConfig.redirectRoute)
    } else {
      this.router.next()
    }
    return false
  }
}
