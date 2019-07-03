import { Injectable, ServiceRoute } from 'vue-service-app'
import { Computed, State } from 'rx-state'
import { pluck } from 'rxjs/operators'

/**
 * 根据路由参数生成query$
 */
@Injectable()
export class RouteService {
  to$: State<ServiceRoute>
  query$: Computed<any>
  layout$: Computed<string>
  constructor() {
    this.to$ = new State({})
    this.query$ = new Computed(this.to$.pipe(pluck('meta', 'query')))
    this.layout$ = new Computed(this.to$.pipe(pluck('meta', 'layout')))
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    if (!to.meta.layout && to.name) {
      console.warn(`can not find meta.layout on route -> ${to.name}`)
    } else {
      this.to$.commit(() => to)
      next()
    }
  }
}
