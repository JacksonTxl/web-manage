import { State, withNamespace } from 'rx-state'
import { sidebarService } from '@/services/sidebar.service'
import { tabService } from '@/services/tab.service'
import { ServiceRoute, RouteGuard } from 'vue-service-app'
const t = withNamespace('dashboard')
class DashboardService implements RouteGuard {
  list$ = new State<any[]>([], t('list'))
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    console.log('dashboard service')
    sidebarService.SET_SELECTED_KEYS(['1'])
    sidebarService.SET_OPEN_KEYS([])
    tabService.init(`首页`, to)
    next()
  }
  beforeRouteUpdate(to: ServiceRoute, from: ServiceRoute, next: any) {
    console.log('dashboard update')
    next()
  }
}

export const dashboardService = new DashboardService()
