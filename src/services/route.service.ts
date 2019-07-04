import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { Computed, State } from 'rx-state'
import { pluck } from 'rxjs/operators'

/**
 * 根据路由参数生成query$
 */
@Injectable()
export class RouteService implements RouteGuard {
  query$: State<any>
  layout$: State<string>
  constructor() {
    this.query$ = new State({})
    this.layout$ = new State('')
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: Function) {
    this.query$.commit(() => to.meta.query)
    next()
  }
  afterEach(to: ServiceRoute, from: ServiceRoute) {
    if (!to.meta.layout && to.name) {
      console.warn(`can not find meta.layout on route -> ${to.name}`)
    } else {
      this.layout$.commit(() => to.meta.layout)
    }
  }
}
