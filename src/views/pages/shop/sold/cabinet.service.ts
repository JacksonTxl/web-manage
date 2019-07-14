import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { RedirectService } from '@/services/redirect.service'

@Injectable()
export class CabinetService implements RouteGuard {
  constructor(private redirectService: RedirectService) {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.redirectService.redirect({
      locateRouteName: 'shop-sold-cabinet',
      redirectRouteName: 'shop-sold-cabinet-list',
      to,
      next
    })
  }
}
