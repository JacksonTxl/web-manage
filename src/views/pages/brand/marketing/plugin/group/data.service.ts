import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { GroupBuyApi, GroupData } from '@/api/v1/marketing/group_buy'
import { MarketingApi } from '@/api/v1/marketing/marketing'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'
import { anyAll } from '@/operators'
@Injectable()
export class DataService implements Controller {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  collect$ = new State([])
  auth$ = this.authService.authMap$({}) // 记得设置鉴权
  constructor(
    private marketingApi: MarketingApi,
    private GroupBuyApi: GroupBuyApi,
    private authService: AuthService
  ) {}
  @Effect()
  getData(params: GroupData) {
    return this.GroupBuyApi.getData(params).pipe(
      tap((res: any) => {
        console.log(res)
        res = this.authService.filter(res) // 这句话啥意思
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
        this.collect$.commit(() => res.collect)
      })
    )
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    console.log(to)
    return this.getData(to.meta.query)
  }
}
