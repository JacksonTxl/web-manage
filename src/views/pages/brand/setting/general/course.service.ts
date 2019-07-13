import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { AuthService } from '@/services/auth.service'
@Injectable()
export class CourseService implements RouteGuard {
  authTab$ = this.authService.getAuthTab$([
    'brand-setting-general-course-personal',
    'brand-setting-general-course-team'
  ])
  constructor(private authService: AuthService) {}
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.authService.redirect({
      locateRouteName: 'brand-setting-general-course',
      redirectRouteName: this.authTab$.snapshot().firstRoute,
      to,
      next
    })
  }
}
