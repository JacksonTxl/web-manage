import { State } from '@/utils/rx-state'
import { StRoute, StRouteGuard } from '@/types'
import { sidebarService } from '@/services/sidebar.service'
import { tabService } from '@/services/tab.service'

class DashboardService implements StRouteGuard {
  list$ = new State<any[]>([])
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
