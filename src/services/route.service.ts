import { Injectable, ServiceRoute } from 'vue-service-app'
import { Computed, log, State } from 'rx-state'
import { pluck, take, tap } from 'rxjs/operators'
import { Store } from './store'
import { Subject, BehaviorSubject } from 'rxjs'

/**
 * 根据路由参数生成query$
 */
@Injectable()
export class RouteService extends Store<ServiceRoute> {
  state$: State<ServiceRoute>
  query$: Computed<any>
  layout$: Computed<string>
  constructor() {
    super()
    this.state$ = new State({})

    this.query$ = new Computed(this.state$.pipe(pluck('meta', 'query')))
    this.layout$ = new Computed(this.state$.pipe(pluck('meta', 'layout')))
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    if (!to.meta.layout && to.name) {
      console.warn(`can not find meta.layout on route -> ${to.name}`)
    } else {
      this.state$.commit(() => to)
      next()
    }
  }
}
