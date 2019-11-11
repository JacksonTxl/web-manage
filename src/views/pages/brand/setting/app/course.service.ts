import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class CourseService implements Controller {
  authTabs$ = this.authService.getAuthTabs$('brand-setting-app-course')
  constructor(private authService: AuthService) {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    next()
  }
}
