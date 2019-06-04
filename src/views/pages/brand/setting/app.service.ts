import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { AuthService } from '@/services/auth.service'
@Injectable()
export class AppService implements RouteGuard {
  constructor(
    private authService: AuthService
  ) {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    console.log('before route enter, app', location.pathname, to.name, to.meta.name)
    if (to.name === 'brand-setting-app') {
      next({
        name: 'brand-setting-app-course'
      })
    } else {
      next()
    }
  }
}
