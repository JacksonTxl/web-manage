import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { RedirectService } from '@/services/redirect.service'

@Injectable()
export class StaffService implements RouteGuard {
  authTabs$ = this.redirectService.getAuthTabs$('brand-setting-app-staff')
  constructor(private redirectService: RedirectService) {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    next()
  }
}
