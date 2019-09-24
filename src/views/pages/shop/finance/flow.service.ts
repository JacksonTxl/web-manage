import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { RedirectService } from '@/services/redirect.service'
@Injectable()
export class FlowService implements RouteGuard {
  authTabs$ = this.redirectService.getAuthTabs$('shop-finance-flow')
  constructor(private redirectService: RedirectService) {}
  beforeEach(to: ServiceRoute, from: ServiceRoute) {}
}
