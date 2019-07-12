import {
  RouteGuard,
  Injectable,
  ServiceRoute,
  ServiceRouter
} from 'vue-service-app'
import { UserService } from '@/services/user.service'
import { Computed } from 'rx-state'
import { map } from 'rxjs/operators'

@Injectable()
export class IndexService implements RouteGuard {
  firstMenu$ = new Computed(
    this.userService.menuData$.pipe(
      map((menuData: any) => {
        return menuData.menus[0]
      })
    )
  )
  constructor(
    private userService: UserService,
    private router: ServiceRouter
  ) {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    if (to.name === 'shop-index') {
      this.router.replace({
        name: this.firstMenu$.snapshot().url,
        force: true
      })
    } else {
      next()
    }
  }
}
