import { RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Computed } from 'rx-state/src'
import { Store } from '@/services/store'
import { pluck } from 'rxjs/operators'

export class MineService extends Store<any> implements RouteGuard {
  state$: State<any>
  list$: Computed<any[]>
  constructor() {
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
    this.state$.commit(state => {
      state.list = [1, 2, 3]
    })
    next()
  }
}
