import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { CouponApi, CouponListParams } from '@/api/v1/marketing/coupon'
import { MarketingApi } from '@/api/v1/marketing/marketing'
import { tap } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class ListService implements RouteGuard {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  auth$ = new State({})
  constructor(private marketingApi: MarketingApi, private couponApi: CouponApi, private authService: AuthService) {}
  @Effect()
  getList(params: CouponListParams) {
    return this.couponApi.getList(params).pipe(tap((res:any) => {
      res = this.authService.filter(res)
      this.list$.commit(() => res.list)
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
