import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { Store } from '../store'
import { State, Computed, log } from 'rx-state'
import { pluck } from 'rxjs/operators'

interface Breadcrumb {
  /**
   * 面包屑标签文本
   */
  label: string
  /**
   * 面包屑链接路由对象
   */
  route: {
    name: string
    query?: Object
  }
}
interface LayoutState {
  breadcrumbs: Breadcrumb[]
}

@Injectable()
export class LayoutService extends Store<LayoutState> implements RouteGuard {
  state$: State<LayoutState>
  breadcrumbs$: Computed<Breadcrumb[]>
  constructor() {
    super()
    this.state$ = new State({
      breadcrumbs: []
    })
    this.breadcrumbs$ = new Computed(
      this.state$.pipe(
        pluck('breadcrumbs'),
        log('layout/breadcrumbs')
      )
    )
  }
  /**
   * 各业务页面设定面包屑
   */
  SET_BREADCRUMBS(breadcrumbs: Breadcrumb[]) {
    this.state$.commit(state => {
      state.breadcrumbs = breadcrumbs
    })
  }
}
