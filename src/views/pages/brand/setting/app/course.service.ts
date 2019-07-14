import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { RedirectService } from '@/services/redirect.service'

@Injectable()
export class CourseService implements RouteGuard {
  authTabs$ = this.redirectService.getAuthTabs$('brand-setting-app-course')
  constructor(private redirectService: RedirectService) {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    next()
  }
}
