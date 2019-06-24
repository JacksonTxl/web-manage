import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect, Computed } from 'rx-state'
import { OrderApi, OrderParams } from '@/api/v1/finance/order'
import { tap, pluck } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'
import { Store } from '@/services/store'

export interface SetState {
  list: any[],
}

@Injectable()
export class ListService extends Store<SetState> implements RouteGuard {
  list$: Computed<any>;
  page$ = new State({});
  auth$: Computed<object>

  constructor(
    private orderApi: OrderApi,
    private authService: AuthService
  ) {
    super()
    this.state$ = new State({
      list: [],
      auth: {
        export: this.authService.can('brand_shop:order:order|export')
      }
    })
    this.list$ = new Computed(this.state$.pipe(pluck('list')))
    this.auth$ = new Computed(this.state$.pipe(pluck('auth')))
  }

  beforeEach(to:ServiceRoute, form:ServiceRoute, next:()=>{}) {
    this.getList(to.meta.query).subscribe(() => {
      next()
    })
  }

  @Effect()
  getList(params: OrderParams) {
    return this.orderApi.getOrderList(params).pipe(tap((result:any) => {
      result = this.authService.filter(result)
      this.state$.commit(state => {
        state.list = result.list
      })
      // this.list$.commit(() => res.list)
      this.page$.commit(() => result.page)
    }))
  }

  @Effect()
  orderCancel(orderId: string) {
    return this.orderApi.orderCancel(orderId)
  }
}
