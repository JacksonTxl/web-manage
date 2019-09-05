import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { RedirectService } from '@/services/redirect.service'
@Injectable()
export class StatService implements RouteGuard {
  authTabs$ = this.redirectService.getAuthTabs$('shop-stat')
  constructor(private redirectService: RedirectService) {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    next()
  }
}
