import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect, Computed } from 'rx-state/src'
import { CouponApi, CouponListParams } from '@/api/v1/marketing/coupon'
import { MarketingApi } from '@/api/v1/marketing/marketing'
import { tap, pluck } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'
import { Store } from '@/services/store'

export interface SetState {
  list: any[],
}

@Injectable()
export class ListService extends Store<SetState> implements RouteGuard {
  list$: Computed<any>;
  page$ = new State({})
  auth$: Computed<object>
  constructor(private marketingApi: MarketingApi, private couponApi: CouponApi, private authService: AuthService) {
    super()
    this.state$ = new State({
      list: [],
      auth: {
        add: this.authService.can('brand:activity:coupon|add')
      }
    })
    this.list$ = new Computed(this.state$.pipe(pluck('list')))
    this.auth$ = new Computed(this.state$.pipe(pluck('auth')))
  }
  @Effect()
  getList(params: CouponListParams) {
    return this.couponApi.getList(params).pipe(tap((res:any) => {
      res = this.authService.filter(res)
      this.state$.commit(state => {
        state.list = res.list
      })
      this.page$.commit(() => res.page)
    }))
  }
  beforeEach(to:ServiceRoute, from:ServiceRoute, next:()=>{}) {
    this.getList(to.meta.query).subscribe(() => {
      next()
    })
  }
  stopMarketingCoupon(id: number) {
    return this.marketingApi.stopMarketingCoupon(id).pipe(tap((res:any) => {}))
  }
}
