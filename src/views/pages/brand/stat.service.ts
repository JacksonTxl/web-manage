import { RouteGuard, ServiceRoute, Injectable } from 'vue-service-app'
import { RedirectService } from '@/services/redirect.service'
import { of } from 'rxjs'

@Injectable()
export class StatService implements RouteGuard {
  authTabs$ = this.redirectService.getAuthTabs$('brand-stat')
  constructor(private redirectService: RedirectService) {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    next()
  }
}
