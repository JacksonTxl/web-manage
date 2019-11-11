import { Injectable, Controller } from 'vue-service-app'
import { RedirectService } from '@/services/redirect.service'

@Injectable()
export class MemberService implements Controller {
  constructor(private redirectService: RedirectService) {}
  beforeEach() {
    return this.redirectService.redirect({
      locateRouteName: 'brand-product-card-member',
      redirectRoute: {
        name: 'brand-product-card-member-list'
      }
    })
  }
}
