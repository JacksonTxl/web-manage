import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State } from 'rx-state'
import { AuthService } from '@/services/auth.service'
@Injectable()
export class SmsService implements RouteGuard {
  state$ = new State({})
  authTabs$ = this.authService.getAuthTabs$('brand-setting-sms')
  constructor(private authService: AuthService) {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    next()
  }
}
