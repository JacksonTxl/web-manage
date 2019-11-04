import { Injectable, RouteGuard } from 'vue-service-app'
import { RedirectService } from '@/services/redirect.service'

@Injectable()
export class MemberService implements RouteGuard {
  constructor(private redirectService: RedirectService) {}
  beforeRouteEnter() {
    return this.redirectService.redirect({
      locateRouteName: 'brand-product-card-member',
      redirectRoute: {
        name: 'brand-product-card-member-list'
      }
    })
  }
}
