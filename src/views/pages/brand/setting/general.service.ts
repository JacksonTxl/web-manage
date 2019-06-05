import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { AuthService } from '@/services/auth.service'
@Injectable()
export class GeneralService implements RouteGuard {
  constructor(
    private authService: AuthService
  ) {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    if (to.name === 'brand-setting-general') {
      next({
        name: 'brand-setting-general-brand'
      })
    } else {
      next()
    }
  }
}
