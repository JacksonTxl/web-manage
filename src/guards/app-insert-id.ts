import { Injectable, ServiceRoute } from 'vue-service-app'
import { UserService } from '@/services/user.service'

@Injectable()
export class AppInsertId {
  constructor(private userService: UserService) {}
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    const userBrandId = this.userService.brand$.snapshot().id || ''
    const userShopId = this.userService.shop$.snapshot().id || ''

    if (userBrandId || userShopId) {
      if (!to.query.app_brand_id && !to.query.app_shop) {
        next({
          name: to.name,
          query: {
            ...to.query,
            app_brand_id: userBrandId,
            app_shop_id: userShopId
          }
        })
      } else {
        next()
      }
    } else {
      console.log('下一步')
      next()
    }
  }
}
