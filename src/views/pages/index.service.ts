import { ServiceRoute, Injectable, RouteGuard } from 'vue-service-app'
import { UserService } from '@/services/user.service'

@Injectable()
export class IndexService implements RouteGuard {
  constructor(private userService: UserService) {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    if (to.name === 'index') {
      next({
        name: this.userService.defaultRedirect$.snapshot()
      })
    } else {
      next()
    }
  }
}
