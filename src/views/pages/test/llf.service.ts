import { RouteGuard, ServiceRoute } from 'vue-service-app'
import { tabService } from '@/services/tab.service'
import { sidebarService } from '@/services/sidebar.service'

class LlfService implements RouteGuard {
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: Function) {
    tabService.init('测试', to)
    sidebarService.SET_SELECTED_KEYS(['9'])
    sidebarService.SET_OPEN_KEYS(['sub2'])
    next()
  }
}

export const llfService = new LlfService()
