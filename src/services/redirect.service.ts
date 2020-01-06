import { Injectable, ServiceRouter } from 'vue-service-app'
import { Location } from 'vue-router'

interface RedirectConfig {
  locateRouteName: string
  redirectRoute: Location
}
/**
 * 负责应用跳转 包含tab等
 */
@Injectable()
export class RedirectService {
  constructor(private router: ServiceRouter) {}
  redirect(redirectConfig: RedirectConfig) {
    if (this.router.to.name === redirectConfig.locateRouteName) {
      if (!redirectConfig.redirectRoute.query) {
        redirectConfig.redirectRoute.query = {}
      }
      // 保留app_shop_id query 字段

      redirectConfig.redirectRoute.query.app_brand_id = this.router.to.query.app_shop_id
      redirectConfig.redirectRoute.query.app_shop_id = this.router.to.query.app_shop_id

      this.router.next(redirectConfig.redirectRoute)
    } else {
      this.router.next()
    }
    return false
  }
}
