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
      locateRouteName: 'shop-dashboard',
      redirectRouteName: `shop-dashboard-${
        this.userService.brand$.snapshot().version
      }`,
      from,
      to,
      next
    })
  }
}
