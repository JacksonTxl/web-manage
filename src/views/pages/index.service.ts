import { RouteGuard, Injectable, ServiceRoute } from 'vue-service-app'
import { UserService } from '@/services/user.service'
import { RedirectService } from '@/services/redirect.service'

@Injectable()
export class IndexService implements RouteGuard {
  constructor(
    private userService: UserService,
    private redirectService: RedirectService
  ) {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.redirectService.redirect({
      locateRouteName: 'index',
      redirectRouteName: this.userService.firstMenuUrl$.snapshot(),
      redirectRouteQuery: {
        brand_id: this.userService.brand$.snapshot().id || '',
        shop_id: this.userService.shop$.snapshot().id
      },
      to,
      from,
      next
    })
  }
}
