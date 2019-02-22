import { BeforeRouteEnter } from '@/types'
import { Route } from 'vue-router'
import { useState } from '@/utils/rx-hooks'

class DashboardService implements BeforeRouteEnter {
  namespace = 'Dashboard'
  mobile = useState('', `${this.namespace}/mobile`)
  beforeRouteEnter(to: Route, from: Route, next: Function) {
    next()
  }
}

export const dashboardService = new DashboardService()
