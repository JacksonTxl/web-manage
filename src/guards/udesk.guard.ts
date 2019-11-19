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
    const arr = [
      'brand-dashboard-studio',
      'shop-dashboard-studio',
      'brand-dashboard-club',
      'shop-dashboard-club'
    ]
    if (arr.includes(to.name)) {
      this.udeskService.showUdesk()
    } else {
      this.udeskService.hiddenUdesk()
    }
  }
}
