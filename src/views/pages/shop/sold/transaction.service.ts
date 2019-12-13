import { ServiceRoute } from 'vue-service-app'
import { Injectable, Controller } from 'vue-service-app'
import { RedirectService } from '@/services/redirect.service'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class TransactionService {
  authTabs$ = this.authService.getAuthTabs$('shop-sold-transaction')
  constructor(
    private redirectService: RedirectService,
    private authService: AuthService
  ) {}
  // beforeEach(to: ServiceRoute, from: ServiceRoute) {
  //   console.log(to)
  //   if (to.name === 'shop-sold-transaction-member') {
  //     return this.redirectService.redirect({
  //       locateRouteName: 'shop-sold-transaction-member',
  //       redirectRoute: {
  //         name: 'shop-sold-transaction-list'
  //       }
  //     })
  //   }
  // }
}
