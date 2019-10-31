import { RouteGuard, ServiceRoute, Injectable } from 'vue-service-app'
import { UdeskService } from '@/services/udesk.service'

/**
 * Udesk守卫
 */
@Injectable()
export class UdeskGuard implements RouteGuard {
  isCreate = false
  constructor(private udeskService: UdeskService) {
    //  实例化udesk对象
    // this.udeskService.create()
  }
  beforeRouteEnter(to: ServiceRoute) {
    if (!this.isCreate) {
      this.udeskService.create()
      this.isCreate = true
    }
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
