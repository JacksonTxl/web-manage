import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import {
  GroupBuyApi,
  GroupListParams,
  ShopList,
  GetPoster
} from '@/api/v1/marketing/group-buy'
import { tap } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'
@Injectable()
export class ListService implements Controller {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  info$ = new State({})
  shoplist$ = new State([])
  shoppage$ = new State({})
  isAuth$ = new State({})
  auth$ = this.authService.authMap$({
    // 记得设置鉴权
    add: 'brand:activity:group_buy|add'
  })

  constructor(
    private groupBuyApi: GroupBuyApi,
    private authService: AuthService
  ) {}
  @Effect()
  getList(params: GroupListParams) {
    return this.groupBuyApi.getList(params).pipe(
      tap((res: any) => {
        res = this.authService.filter(res)
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  stopGroup(id: number) {
    return this.groupBuyApi.stopGroupList(id).pipe(tap((res: any) => {}))
  }
  releaseGroup(id: number) {
    return this.groupBuyApi.releaseGroupList(id).pipe(tap((res: any) => {}))
  }
  getSharePosterInfo(id: number, query: GetPoster) {
    return this.groupBuyApi.getPosterInfo(id, query).pipe(
      tap((res: any) => {
        this.info$.commit(() => res.info)
        this.isAuth$.commit(() => res.is_auth)
      })
    )
  }
  @Effect()
  getShopList(id: number, query: ShopList) {
    return this.groupBuyApi.getShopList(query, id).pipe(
      tap((res: any) => {
        this.shoplist$.commit(() => res.list)
        this.shoppage$.commit(() => res.page)
      })
    )
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getList(to.meta.query)
  }
}
