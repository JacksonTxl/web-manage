import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state'

/**
 * 根据路由参数生成searchQuery$
 */
@Injectable()
export class SearchService<T> implements RouteGuard {
  searchQuery$: State<T>
  constructor() {
    this.searchQuery$ = new State({})
  }
  protected SET_SEARCH_QUERY(query: T) {
    this.searchQuery$.commit(() => query)
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.SET_SEARCH_QUERY(to.meta.query)
    next()
  }
}
