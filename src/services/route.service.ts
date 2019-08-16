import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { Computed, State } from 'rx-state'
import { pluck } from 'rxjs/operators'
import { NProgressService } from './nprogress.service'

/**
 * 根据路由参数生成query$
 */
@Injectable()
export class RouteService implements RouteGuard {
  query$: State<any>
  layout$: State<string>
  constructor(private nProgressService: NProgressService) {
    this.query$ = new State({})
    this.layout$ = new State('')
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    this.query$.commit(() => to.meta.query)
    this.nProgressService.SET_TEXT('页面数据加载中...')
  }
  /**
   * 等待前置的所有守卫执行完再执行layout赋值
   */
  afterEach(to: ServiceRoute, from: ServiceRoute) {
    if (!to.meta.layout && to.name) {
      console.warn(`can not find meta.layout on route -> ${to.name}`)
    } else {
      this.layout$.commit(() => to.meta.layout)
    }
  }
}
