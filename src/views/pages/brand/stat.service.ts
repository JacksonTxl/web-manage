import { RouteGuard, ServiceRoute, Injectable } from 'vue-service-app'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class StatService implements RouteGuard {
  authTabs$ = this.authService.getAuthTabs$('brand-stat')
  constructor(private authService: AuthService) {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    next()
  }
}
