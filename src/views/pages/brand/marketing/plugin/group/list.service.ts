import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { GroupBuyApi, GroupListParams } from '@/api/v1/marketing/group_buy'
import { MarketingApi } from '@/api/v1/marketing/marketing'
import { tap } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class ListService implements Controller {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  auth$ = this.authService.authMap$({
    // 记得设置鉴权
    add: 'brand:activity:group|add'
  })
  constructor(
    private marketingApi: MarketingApi,
    private GroupBuyApi: GroupBuyApi,
    private authService: AuthService
  ) {}
  @Effect()
  getList(params: GroupListParams) {
    return this.GroupBuyApi.getList(params).pipe(
      tap((res: any) => {
        console.log(res)
        res = this.authService.filter(res)
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
