import { RouteGuard, ServiceRoute, Injectable } from 'vue-service-app'
import { UdeskService } from '@/services/udesk.service'

/**
 * Udesk守卫
 */
@Injectable()
export class UdeskGuard implements RouteGuard {
  constructor(private udeskService: UdeskService) {}
  beforeRouteEnter(to: ServiceRoute) {
    this.udeskService.setIsShowUdeskBtn(this.isShowUdeskBtn(to))
  }
  isShowUdeskBtn(to: ServiceRoute) {
    const arr = [
      'brand-dashboard-studio',
      'shop-dashboard-studio',
      'brand-dashboard-club',
      'shop-dashboard-club'
    ]
    return arr.includes(to.name)
  }
}
