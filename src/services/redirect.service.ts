import { Injectable, ServiceRouter, ServiceRoute } from 'vue-service-app'
import { Location } from 'vue-router'
import { Observable } from 'rxjs'

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
      return this.router.redirect(redirectConfig.redirectRoute)
    }
  }
}
