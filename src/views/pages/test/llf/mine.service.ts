import { RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Computed } from 'rx-state/src'
import { Store } from '@/services/store'
import { pluck } from 'rxjs/operators'
import { RouteService } from '@/services/route.service'

export class MineService extends Store<any> implements RouteGuard {
  state$: State<any>
  list$: Computed<any[]>
  constructor(private routeService: RouteService) {
    super()
    this.state$ = new State({
      list: []
    })
    this.list$ = new Computed(this.state$.pipe(pluck('list')))
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.state$.commit(state => {
      state.list = [4, 5, 6]
    })
    next()
  }
  beforeRouteUpdate(to: ServiceRoute, from: ServiceRoute, next: any) {
    // 格式化后的query快照对象 可使用此对象进行请求
    console.log(this.routeService.query$.snapshot())
    this.state$.commit(state => {
      state.list = [1, 2, 3]
    })
    next()
  }
}
