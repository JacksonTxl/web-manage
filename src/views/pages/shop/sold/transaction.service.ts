import { Injectable, Controller } from 'vue-service-app'
import { RedirectService } from '@/services/redirect.service'

@Injectable()
export class TransactionService implements Controller {
  constructor(private redirectService: RedirectService) {}
  beforeEach() {
    return this.redirectService.redirect({
      locateRouteName: 'shop-sold-transaction',
      redirectRoute: {
        name: 'shop-sold-transaction-list'
      }
    })
  }
}
