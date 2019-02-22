import { BeforeRouteEnter } from '@/types'
import { Route } from 'vue-router'
import { useState } from '@/utils/rx-hooks'
import { of } from 'rxjs'

class DashboardService implements BeforeRouteEnter {
  namespace = 'Dashboard'
  mobile = useState('', `${this.namespace}/mobile`)
  list = useState([], `${this.namespace}/list`)

  beforeRouteEnter(to: Route, from: Route, next: Function) {
    this.initData().subscribe(() => {
      next()
    })
  }
  initData() {
    return of(1)
  }
}

export const dashboardService = new DashboardService()
