import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State } from 'rx-state'
import { tap } from 'rxjs/operators'
import { MemberApi } from '@/api/v1/member'

@Injectable()
export class SalesInterestsService implements RouteGuard {
  couponList$ = new State([])
  couponCount$ = new State({})
  page$ = new State({})
  constructor(private cardsApi: MemberApi) {}

  getCouponInfo(id: string, query: any) {
    return this.cardsApi.getCouponList(id, query).pipe(
      tap(res => {
        console.log(res, '卡获取数据')
        this.couponList$.commit(() => res.coupon_list)
        this.couponCount$.commit(() => res.coupon_count)
        this.page$.commit(() => res.page)
      })
    )
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    let { id, current_page, size } = to.meta.query
    return this.getCouponInfo(id, { current_page, size })
  }
}
