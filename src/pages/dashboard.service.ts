import { State } from '@/utils/rx-state'
import { BeforeRouteEnter, StRoute } from '@/types'
import { sidebarService } from '@/services/sidebar.service'
import { tabService } from '@/services/tab.service'

class DashboardService implements BeforeRouteEnter {
  list$ = new State<any[]>([])
  beforeRouteEnter(to: StRoute, from: StRoute, next: any) {
    sidebarService.SET_SELECTED_KEYS(['1'])

    tabService.ADD({
      name: '首页',
      key: to.name
    })

    console.log('dashboard')
    next()
  }
}

export const dashboardService = new DashboardService()
