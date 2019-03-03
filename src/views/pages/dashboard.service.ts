import { State, withNamespace } from 'rx-state'
import { sidebarService } from '@/services/sidebar.service'
import { ServiceRoute, RouteGuard } from 'vue-service-app'
import { timer } from 'rxjs'
const t = withNamespace('dashboard')
class DashboardService implements RouteGuard {
  list$ = new State<any[]>([], t('list'))
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    sidebarService.SET_SELECTED_KEYS(['1'])
    sidebarService.SET_OPEN_KEYS([])
    next()
  }
  beforeRouteUpdate(to: ServiceRoute, from: ServiceRoute, next: any) {
    console.log('dashboard update')
    next()
  }
}

export const dashboardService = new DashboardService()
