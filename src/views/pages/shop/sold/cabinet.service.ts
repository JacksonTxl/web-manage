import { Injectable, Controller } from 'vue-service-app'
import { RedirectService } from '@/services/redirect.service'

@Injectable()
export class CabinetService implements Controller {
  constructor(private redirectService: RedirectService) {}
  beforeEach() {
    return this.redirectService.redirect({
      locateRouteName: 'shop-sold-cabinet',
      redirectRoute: {
        name: 'shop-sold-cabinet-list'
      }
    })
  }
}
