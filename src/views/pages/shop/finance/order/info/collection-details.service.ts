import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect, Computed } from 'rx-state'
import { OrderApi } from '@/api/v1/finance/order'
import { tap, pluck } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'
import { Store } from '@/services/store'

export interface SetState {
  list: any[]
}

@Injectable()
export class CollectionDetailsService extends Store<SetState>
  implements RouteGuard {
  list$: Computed<any>
  // auth$: Computed<object>
  constructor(private orderApi: OrderApi, private authService: AuthService) {
    super()
    this.state$ = new State({
      list: [],
      auth: {}
    })
    this.list$ = new Computed(this.state$.pipe(pluck('list')))
  }
  @Effect()
  getList(id: string) {
    return this.orderApi.getOrderFlowList(id).pipe(
      tap((res: any) => {
        res = this.authService.filter(res)
        this.state$.commit(state => {
          state.list = res.list
        })
        // this.list$.commit(() => res.list)
      })
    )
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: () => {}) {
    this.getList(to.meta.query.id).subscribe(() => {
      next()
    })
  }
}
