import {
  RouteGuard,
  Injectable,
  ServiceRoute
} from 'vue-service-app'
import { UserService } from '@/services/user.service'

@Injectable()
export class IndexService implements RouteGuard {
  constructor(
    private userService: UserService
  ) {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    if (to.name === 'shop-index') {
      next({
        name: this.userService.firstMenu$.snapshot().url,
        query: {
          _t: Math.random()
            .toString(16)
            .slice(3)
        }
      })
    } else {
      next()
    }
  }
}
