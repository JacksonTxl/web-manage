import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { CouponApi, CouponListParams } from '@/api/v1/marketing/coupon'
import { tap } from 'rxjs/operators'

@Injectable()
export class MarketingTitleService {
  info$ = new State({})
  loading$ = new State({})
  constructor(private couponApi: CouponApi) {}
  @Effect()
  getInfo(type: number) {
    // return this.couponApi.getList(params).pipe(tap((res:any) => {
    //   res = this.authService.filter(res)
    //   this.list$.commit(() => res.list)
    //   this.page$.commit(() => res.page)
    // }))
  }
}
