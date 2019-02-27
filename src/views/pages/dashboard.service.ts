import { State, withNamespace } from '@/utils/rx-state'
import { sidebarService } from '@/services/sidebar.service'
import { tabService } from '@/services/tab.service'
import { Service, ServiceRoute } from 'vue-service-app'
const t = withNamespace('dashboard')
class DashboardService extends Service {
  list$ = new State<any[]>([], t('list'))
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    console.log('dashboard service')
    sidebarService.SET_SELECTED_KEYS(['1'])
    tabService.init(`首页`, to)
    next()
  }
  beforeRouteUpdate(to: ServiceRoute, from: ServiceRoute, next: any) {
    console.log('dashboard update')
    next()
  }
}

export const dashboardService = new DashboardService()
