import { Injectable, RouteGuard } from 'vue-service-app'
import { RedirectService } from '@/services/redirect.service'

@Injectable()
export class TransactionService implements RouteGuard {
  constructor(private redirectService: RedirectService) {}
  beforeRouteEnter() {
    return this.redirectService.redirect({
      locateRouteName: 'shop-sold-transaction',
      redirectRoute: {
        name: 'shop-sold-transaction-list'
      }
    })
  }
}
