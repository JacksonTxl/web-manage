import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { GroupBuyApi, GroupListParams } from '@/api/v1/marketing/group-buy'
import { tap } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'
@Injectable()
export class ListService implements Controller {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  info$ = new State({})
  shopList$ = new State([])
  shopPage$ = new State({})
  isAuth$ = new State({})
  auth$ = this.authService.authMap$({
    // 记得设置鉴权
    add: 'brand:activity:group_buy|add'
  })
  // brand$ = this.userService.brand$  需要
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
  getSharePosterInfo(params: { id: number }) {
    return this.groupBuyApi.getPosterInfo(params).pipe(
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
        this.shopList$.commit(() => res.list)
        this.shopPage$.commit(() => res.page)
      })
    )
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getList(to.meta.query)
  }
}
