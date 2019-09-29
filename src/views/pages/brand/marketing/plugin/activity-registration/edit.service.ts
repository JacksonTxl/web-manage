import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { CouponApi, CouponListParams } from '@/api/v1/marketing/coupon'
import { MarketingApi } from '@/api/v1/marketing/marketing'
import { tap } from 'rxjs/operators'

@Injectable()
export class EditService implements RouteGuard {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  constructor(
    private marketingApi: MarketingApi,
    private couponApi: CouponApi
  ) {}
  @Effect()
  getList(params: CouponListParams) {
    return this.couponApi.getList(params).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }

  stopMarketingCoupon(id: number) {
    return this.marketingApi.stopMarketingCoupon(id).pipe(tap((res: any) => {}))
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getList(to.meta.query)
  }
}
