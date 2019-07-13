import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { AuthService } from '@/services/auth.service'
@Injectable()
export class GeneralService implements RouteGuard {
  authTab$ = this.authService.getAuthTab$([
    'brand-setting-general-brand',
    'brand-setting-general-course',
    'brand-setting-general-pay-type',
    'brand-setting-general-coach-level',
    'brand-setting-general-user-level'
  ])
  constructor(
    private authService: AuthService
  ) {}
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.authService.redirect({
      locateRouteName: 'brand-setting-general',
      redirectRouteName: this.authTab$.snapshot().firstRoute,
      to,
      next
    })
  }
}
