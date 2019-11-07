import { Injectable, RouteGuard } from 'vue-service-app'
import { RedirectService } from '@/services/redirect.service'
@Injectable()
export class CourtService implements RouteGuard {
  constructor(private redirectService: RedirectService) {}
  beforeRouteEnter() {
    return this.redirectService.redirect({
      locateRouteName: 'shop-setting-court',
      redirectRoute: {
        name: 'shop-setting-court-list'
      }
    })
  }
}
