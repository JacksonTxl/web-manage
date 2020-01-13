import { Injectable, ServiceRoute } from 'vue-service-app'
import { AuthService } from '@/services/auth.service'
import { RedirectService } from '@/services/redirect.service'
@Injectable()
export class EntranceService {
  authTabs$ = this.authService.getAuthTabs$('shop-reception-entrance')
  constructor(
    private authService: AuthService,
    private redirectService: RedirectService
  ) {}
  beforeEach(to: ServiceRoute) {
    return this.redirectService.redirect({
      locateRouteName: 'shop-reception-entrance',
      redirectRoute: {
        name: 'shop-reception-entrance-entrance',
        query: to.meta.query
      }
    })
  }
}
