import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state'
import { Observable } from 'rxjs'
import { pluck, distinctUntilChanged } from 'rxjs/operators'

interface RouteState {
  /**
   * 序列化后的query对象
   */
  query: any
  layout: string
}
/**
 * 根据路由参数生成query$
 */
@Injectable()
export class RouteService implements RouteGuard {
  state$: State<RouteState>
  query$: Observable<any>
  layout$: Observable<string>
  constructor() {
    const initialState = {
      query: {},
      layout: 'loading'
    }
    this.state$ = new State(initialState, 'RouteService.state$')
    this.query$ = this.state$.pipe(pluck('query'))
    this.layout$ = this.state$.pipe(
      pluck('layout'),
      distinctUntilChanged()
    )
  }
  private SET_LAYOUT(layout: string) {
    this.state$.commit(state => {
      state.layout = layout
    })
  }
  protected SET_QUERY(query: any) {
    this.state$.commit(state => {
      state.query = query
    })
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.SET_QUERY(to.meta.query)
    if (!to.meta.layout && to.name) {
      console.warn(`can not find meta.layout on route -> ${to.name}`)
    } else {
      this.SET_LAYOUT(to.meta.layout)
      next()
    }
  }
}
