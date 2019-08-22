import { RouteGuard, ServiceRoute, Injectable } from 'vue-service-app'
import { UserService } from '@/services/user.service'
import { RedirectService } from '@/services/redirect.service'

@Injectable()
export class DashboardService implements RouteGuard {
  constructor(
    private redirectService: RedirectService,
    private userService: UserService
  ) {}
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.redirectService.redirect({
      locateRouteName: 'brand-dashboard',
      redirectRouteName: `brand-dashboard-${
        this.userService.brand$.snapshot().version
      }`,
      redirectRouteQuery: {
        brand_id: this.userService.brand$.snapshot().id,
        shop_id: this.userService.shop$.snapshot().id
      },
      from,
      to,
      next
    })
  }
}
