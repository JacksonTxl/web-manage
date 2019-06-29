import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { CouponApi, CouponListParams } from '@/api/v1/marketing/coupon'
import { MarketingApi } from '@/api/v1/marketing/marketing'
import { tap } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'
import { forkJoin } from 'rxjs'

@Injectable()
export class ReceiveService implements RouteGuard {
  list$ = new State([])
  page$ = new State({})
  info$ = new State({})
  loading$ = new State({})
  auth$ = new State({})
  constructor(private marketingApi: MarketingApi, private authService: AuthService) {}
  @Effect()
  getReceiveList(params: any) {
    return this.marketingApi.getReceiveList(params).pipe(tap((res:any) => {
      // res = this.authService.filter(res)
      this.list$.commit(() => res.list)
      this.page$.commit(() => res.page)
      this.info$.commit(() => res.info)
    }))
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
  beforeEach(to:ServiceRoute, from:ServiceRoute, next:()=>{}) {
    this.getReceiveList(to.meta.query).subscribe(() => {
      next()
    })
  }
}
