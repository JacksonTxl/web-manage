import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { RedirectService } from '@/services/redirect.service'

@Injectable()
export class LabelService implements RouteGuard {
  constructor(private redirectService: RedirectService) {}
  beforeRouteEnter() {
    return this.redirectService.redirect({
      locateRouteName: 'shop-member-label',
      redirectRoute: {
        name: 'shop-member-label-list'
      }
    })
  }
}
