import { State, withNamespace } from 'rx-state'
import { sidebarService, SidebarService } from '@/services/sidebar.service'
import { ServiceRoute, RouteGuard } from 'vue-service-app'
const t = withNamespace('dashboard')
class DashboardService implements RouteGuard {
  // injected
  sidebar: SidebarService

  list$ = new State<any[]>([], t('list'))
  constructor(sidebar: SidebarService) {
    this.sidebar = sidebar
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.sidebar.SET_SELECTED_KEYS(['1'])
    this.sidebar.SET_OPEN_KEYS([])
    next()
  }
  beforeRouteUpdate(to: ServiceRoute, from: ServiceRoute, next: any) {
    console.log('dashboard update')
    next()
  }
}

export const dashboardService = new DashboardService(sidebarService)
