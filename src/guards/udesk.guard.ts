import { RouteGuard, ServiceRoute, Injectable } from 'vue-service-app'
import { UdeskService } from '@/services/udesk.service'

/**
 * Udesk守卫
 */
@Injectable()
export class UdeskGuard implements RouteGuard {
  isCreate = false
  constructor(private udeskService: UdeskService) {}
  beforeRouteEnter(to: ServiceRoute) {
    if (!this.isCreate) {
      return this.udeskService.create().then(() => {
        this.isCreate = true
        this.udeskIsShow(to)
      })
    } else {
      this.udeskIsShow(to)
    }
  }
  udeskIsShow(to: ServiceRoute) {
    if (
      to.name === 'brand-dashboard-studio' ||
      to.name === 'shop-dashboard-studio'
    ) {
      this.udeskService.showUdesk()
    } else {
      this.udeskService.hiddenUdesk()
    }
  }
}
