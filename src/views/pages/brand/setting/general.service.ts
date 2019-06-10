import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { AuthService } from '@/services/auth.service'
@Injectable()
export class GeneralService implements RouteGuard {
  constructor(
    private authService: AuthService
  ) {}
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    const target = 'brand-setting-general-brand'
    if (to.name === 'brand-setting-general') {
      next({
        name: target,
        force: true
      })
    } else {
      next()
    }
  }
}
