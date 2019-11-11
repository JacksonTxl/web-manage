import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { RedirectService } from '@/services/redirect.service'

@Injectable()
export class LabelService implements Controller {
  constructor(private redirectService: RedirectService) {}
  beforeEach() {
    return this.redirectService.redirect({
      locateRouteName: 'shop-member-label',
      redirectRoute: {
        name: 'shop-member-label-list'
      }
    })
  }
}
