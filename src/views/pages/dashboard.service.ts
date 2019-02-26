import { State, withNamespace } from '@/utils/rx-state'
import { StRoute, StRouteGuard } from '@/types/route'
import { sidebarService } from '@/services/sidebar.service'
import { tabService } from '@/services/tab.service'
const t = withNamespace('dashboard')
class DashboardService implements StRouteGuard {
  list$ = new State<any[]>([], t('list'))
  beforeRouteEnter(to: StRoute, from: StRoute, next: any) {
    sidebarService.SET_SELECTED_KEYS(['1'])
    tabService.init(`首页`, to)
    next()
  }
  beforeRouteUpdate(to: StRoute, from: StRoute, next: any) {
    console.log('dashboard update')
    next()
  }
}

export const dashboardService = new DashboardService()
