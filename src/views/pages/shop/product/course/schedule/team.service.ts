import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { RedirectService } from '@/services/redirect.service'
@Injectable()
export class TeamService implements RouteGuard {
  constructor(private redirectService: RedirectService) {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.redirectService.redirect({
      locateRouteName: 'shop-product-course-schedule-team',
      redirectRouteName: 'shop-product-course-schedule-team-team',
      next,
      to
    })
  }
}
