import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State } from 'rx-state'
import { tap } from 'rxjs/operators'
import { MemberApi, CouponQuery } from '@/api/v1/member'

@Injectable()
export class SalesInterestsService implements RouteGuard {
  couponList$ = new State([])
  couponCount$ = new State({})
  page$ = new State({})
  constructor(private cardsApi: MemberApi) {}

  getCouponInfo(id: string, query: CouponQuery) {
    return this.cardsApi.getCouponList(id, query).pipe(
      tap(res => {
        console.log(res, '卡获取数据')
        this.couponList$.commit(() => res.coupon_list)
        this.couponCount$.commit(() => res.coupon_count)
        this.page$.commit(() => res.page)
      })
    )
  }
  beforeRouteUpdate(to: ServiceRoute, from: ServiceRoute) {
    console.log('==', to)
    console.log('==', from)
    let { id, page, size } = to.meta.query
    return this.getCouponInfo(id, { page, size })
  }

  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    console.log('route enter', to.meta)
    const { id } = to.meta.query
    return this.getCouponInfo(id, {})
  }
}
