import { RouteGuard, Injectable, ServiceRoute } from 'vue-service-app'
import { UserService } from '@/services/user.service'
import { RedirectService } from '@/services/redirect.service'

@Injectable()
export class IndexService implements RouteGuard {
  constructor(
    private userService: UserService,
    private redirectService: RedirectService
  ) {}
  beforeRouteEnter() {
    const firstUrl = this.userService.firstMenuUrl$.snapshot()
    if (!firstUrl) {
      return
    }
    return this.redirectService.redirect({
      locateRouteName: 'index',
      redirectRoute: {
        name: firstUrl
      }
    })
  }
}
