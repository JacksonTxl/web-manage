import { IsState, State } from '@/utils/rx-state'
import { BeforeRouteEnter, StRoute } from '@/types'

class DashboardService implements BeforeRouteEnter {
  @IsState([]) list$!: State<any[]>
  beforeRouteEnter(to: StRoute, from: StRoute, next: any) {
    console.log('dashboard')
    next()
  }
}

export const dashboardService = new DashboardService()
