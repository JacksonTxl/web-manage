import { Injectable } from 'vue-service-app'
import { State, Computed } from 'rx-state'
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
export class LayoutService {
  layoutState$ = new State<LayoutState>({
    breadcrumbs: []
  })
  loading$ = new State({})
  breadcrumbs$: Computed<Breadcrumb[]>
  constructor() {
    this.breadcrumbs$ = new Computed(this.layoutState$.pipe(pluck('breadcrumbs')))
  }
  /**
   * 各业务页面设定面包屑
   */
  SET_BREADCRUMBS(breadcrumbs: Breadcrumb[]) {
    this.layoutState$.commit(layoutState => {
      layoutState.breadcrumbs = breadcrumbs
    })
  }
}
