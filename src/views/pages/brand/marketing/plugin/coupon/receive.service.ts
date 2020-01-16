import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { MarketingApi } from '@/api/v1/marketing/marketing'
import { tap } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'

export interface SetState {}

@Injectable()
export class ReceiveService implements Controller {
  list$ = new State([])
  page$ = new State({})
  info$ = new State({})
  loading$ = new State({})
  auth$ = this.authService.authMap$({
    export: 'brand:activity:coupon|export'
  })
  constructor(
    private marketingApi: MarketingApi,
    private authService: AuthService
  ) {}
  @Effect()
  getReceiveList(params: any) {
    return this.marketingApi.getReceiveList(params).pipe(
      tap((res: any) => {
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
