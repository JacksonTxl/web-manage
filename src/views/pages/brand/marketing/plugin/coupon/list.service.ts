import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect, Computed } from 'rx-state'
import { CouponApi, CouponListParams } from '@/api/v1/marketing/coupon'
import { MarketingApi } from '@/api/v1/marketing/marketing'
import { tap, pluck } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'
import { Store } from '@/services/store'

export interface SetState {
  list: any[],
}

@Injectable()
export class ListService implements RouteGuard {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  auth$ = this.authService.authMap({
    add: 'brand:activity:coupon|add'
  })
  constructor(private marketingApi: MarketingApi, private couponApi: CouponApi, private authService: AuthService) {}
  @Effect()
  getList(params: CouponListParams) {
    return this.couponApi.getList(params).pipe(tap((res:any) => {
      res = this.authService.filter(res)
      this.list$.commit(() => res.list)
      this.page$.commit(() => res.page)
    }))
  }

  stopMarketingCoupon(id: number) {
    return this.marketingApi.stopMarketingCoupon(id).pipe(tap((res:any) => {}))
  }
  beforeEach(to:ServiceRoute, from:ServiceRoute) {
    return this.getList(to.meta.query)
  }
}
