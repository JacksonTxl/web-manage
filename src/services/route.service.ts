import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state'
import { Observable } from 'rxjs'
import { pluck } from 'rxjs/operators'

interface RouteState {
  /**
   * 序列化后的query对象
   */
  query: any
}
/**
 * 根据路由参数生成query$
 */
@Injectable()
export class RouteService implements RouteGuard {
  state$: State<RouteState>
  query$: Observable<any>
  constructor() {
    const initialState = {
      query: {}
    }
    this.state$ = new State(initialState, 'RouteService.state$')
    this.query$ = this.state$.pipe(pluck('query'))
  }
  protected SET_QUERY(query: any) {
    this.state$.commit(state => {
      state.query = query
    })
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.SET_QUERY(to.meta.query)
    next()
  }
}
