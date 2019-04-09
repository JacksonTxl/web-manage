import { Injectable } from 'vue-service-app'
import { Store } from '../store'
import { State, Computed } from 'rx-state'
import { pluck } from 'rxjs/operators'

interface Breadcrumb {
  title: string
  href: string
}
interface LayoutState {
  breadcrumbs: Breadcrumb[]
}

@Injectable()
export class LayoutService extends Store<LayoutState> {
  state$: State<LayoutState>
  breadcrumbs$: Computed<Breadcrumb[]>
  constructor() {
    super()
    this.state$ = new State({
      breadcrumbs: []
    })
    this.breadcrumbs$ = new Computed(this.state$.pipe(pluck('breadcrumbs')))
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
