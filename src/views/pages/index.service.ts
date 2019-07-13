import { RouteGuard, Injectable, ServiceRoute } from 'vue-service-app'
import { UserService } from '@/services/user.service'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class IndexService implements RouteGuard {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.authService.redirect({
      locateRouteName: 'index',
      redirectRouteName: this.userService.defaultRedirect$.snapshot(),
      to,
      next
    })
  }
}
