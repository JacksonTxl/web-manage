import { Injectable, Controller } from 'vue-service-app'
import { RedirectService } from '@/services/redirect.service'
@Injectable()
export class CourtService implements Controller {
  constructor(private redirectService: RedirectService) {}
  beforeEach() {
    return this.redirectService.redirect({
      locateRouteName: 'shop-setting-court',
      redirectRoute: {
        name: 'shop-setting-court-list'
      }
    })
  }
}
