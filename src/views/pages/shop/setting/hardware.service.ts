import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { RedirectService } from '@/services/redirect.service'
@Injectable()
export class HardwareService implements RouteGuard {
  authTabs$ = this.redirectService.getAuthTabs$('shop-setting-hardware')
  constructor(private redirectService: RedirectService) {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    next()
  }
}
