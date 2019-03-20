import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state'

/**
 * 根据路由参数生成query$
 */
@Injectable()
export class RouteService implements RouteGuard {
  query$: State<any>
  constructor() {
    this.query$ = new State({})
  }
  protected SET_SEARCH_QUERY(query: any) {
    this.query$.commit(() => query)
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.SET_SEARCH_QUERY(to.meta.query)
    next()
  }
}
