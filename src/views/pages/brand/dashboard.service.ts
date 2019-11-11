import { Controller, ServiceRoute, Injectable } from 'vue-service-app'
import { UserService } from '@/services/user.service'
import { RedirectService } from '@/services/redirect.service'

@Injectable()
export class DashboardService implements Controller {
  constructor(
    private redirectService: RedirectService,
    private userService: UserService
  ) {}
  beforeEach(to: ServiceRoute) {
    const useVersion = this.userService.useVersion$.snapshot()
    return this.redirectService.redirect({
      locateRouteName: 'brand-dashboard',
      redirectRoute: {
        name: `brand-dashboard-${useVersion}`
      }
    })
  }
}
