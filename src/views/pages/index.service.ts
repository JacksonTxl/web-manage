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
      // TODO: 这里暂时用随机数 正确的用法这里应该是跳转
      // brand-index 和 shop-index
      // 由 brand-index 或 shop-index 服务决定使用哪个query （brand-id shop-id）
      redirectRouteQuery: {
        _f: Math.random()
          .toString(16)
          .slice(3)
      },
      to,
      from,
      next
    })
  }
}
