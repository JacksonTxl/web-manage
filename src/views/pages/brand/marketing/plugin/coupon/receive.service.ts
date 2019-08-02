import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect, Computed } from 'rx-state'
import { CouponApi, CouponListParams } from '@/api/v1/marketing/coupon'
import { MarketingApi } from '@/api/v1/marketing/marketing'
import { tap, pluck } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'
import { forkJoin } from 'rxjs'
import { Store } from '@/services/store'

export interface SetState {}

@Injectable()
export class ReceiveService extends Store<SetState> implements RouteGuard {
  list$ = new State([])
  page$ = new State({})
  info$ = new State({})
  auth$ = this.authService.authMap$({
    export: 'brand:activity:coupon|export'
  })
  constructor(
    private marketingApi: MarketingApi,
    private authService: AuthService
  ) {
    super()
    this.state$ = new State({})
  }
  @Effect()
  getReceiveList(params: any) {
    return this.marketingApi.getReceiveList(params).pipe(
      tap((res: any) => {
        // res = this.authService.filter(res)
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
        this.info$.commit(() => res.info)
      })
    )
  }
  // 获取优惠券详情
  // getInfo(id: number) {
  //   return this.marketingApi.getInfo(id).pipe(tap((res:any) => {
  //     this.info$.commit(() => res.info)
  //   }))
  // }
  // serviceInit(id: number) {
  //   return forkJoin(this.getInfo(id), this.getReceiveList(id))
  // }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getReceiveList(to.meta.query)
  }
}
