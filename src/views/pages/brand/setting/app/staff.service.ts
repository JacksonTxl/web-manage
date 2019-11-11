import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class StaffService implements Controller {
  authTabs$ = this.authService.getAuthTabs$('brand-setting-app-staff')
  constructor(private authService: AuthService) {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    next()
  }
}
