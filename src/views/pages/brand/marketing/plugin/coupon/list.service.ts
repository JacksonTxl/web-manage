import { UserService } from '@/services/user.service'
import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { CouponApi, CouponListParams } from '@/api/v1/marketing/coupon'
import { MarketingApi } from '@/api/v1/marketing/marketing'
import { tap } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class ListService implements Controller {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  info$ = new State({})
  auth$ = this.authService.authMap$({
    add: 'brand:activity:coupon|add'
  })
  brand$ = this.userService.brand$
  constructor(
    private marketingApi: MarketingApi,
    private couponApi: CouponApi,
    private authService: AuthService,
    private userService: UserService
  ) {}
  @Effect()
  getList(params: CouponListParams) {
    return this.couponApi.getList(params).pipe(
      tap((res: any) => {
        res = this.authService.filter(res)
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  getPosterInfo(id: number) {
    return this.couponApi.getPosterInfo(id).pipe(
      tap((res: any) => {
        this.info$.commit(() => res.info)
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
