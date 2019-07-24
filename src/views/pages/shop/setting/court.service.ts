import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { RedirectService } from '@/services/redirect.service'
@Injectable()
export class CourtService implements RouteGuard {
  constructor(private redirectService: RedirectService) {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.redirectService.redirect({
      locateRouteName: 'shop-setting-court',
      redirectRouteName: 'shop-setting-court-list',
      next,
      from,
      to
    })
  }
}
