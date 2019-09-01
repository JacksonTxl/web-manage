import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect, Computed } from 'rx-state'
import { OrderApi } from '@/api/v1/finance/order'
import { tap, pluck } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class CollectionDetailsService implements RouteGuard {
  loading$ = new State({})
  list$: Computed<any>
  state$: State<any>
  constructor(private orderApi: OrderApi, private authService: AuthService) {
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
      })
    )
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getList(to.meta.query.id)
  }
}
