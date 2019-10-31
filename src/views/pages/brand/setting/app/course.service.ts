import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class CourseService implements RouteGuard {
  authTabs$ = this.authService.getAuthTabs$('brand-setting-app-course')
  constructor(private authService: AuthService) {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    next()
  }
}
