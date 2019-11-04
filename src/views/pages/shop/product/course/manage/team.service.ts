import { RouteGuard, Injectable, ServiceRoute } from 'vue-service-app'
import { RedirectService } from '@/services/redirect.service'
@Injectable()
export class TeamService implements RouteGuard {
  constructor(private redirectService: RedirectService) {}
  beforeRouteEnter() {
    return this.redirectService.redirect({
      locateRouteName: 'shop-product-course-manage-team',
      redirectRoute: {
        name: 'shop-product-course-manage-team-list'
      }
    })
  }
}
