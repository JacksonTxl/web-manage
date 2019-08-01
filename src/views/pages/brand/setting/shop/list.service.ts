import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { ShopApi, GetListInput } from '@/api/v1/brand/shop'
import { AuthService } from '@/services/auth.service'
import { tap, map } from 'rxjs/operators'
import { UserService } from '@/services/user.service'

@Injectable()
export class ListService implements RouteGuard {
  loading$ = new State({})
  list$ = new State([])
  page$ = new State({})
  count$ = new State({})
  auth$ = this.authService.authMap$({
    add: 'brand_shop:shop:shop|add'
  })
  shopStatusList$ = this.userService
    .getOptions$('shop.shop_status')
    .pipe(map(options => [{ value: -1, label: '全部运营状态' }].concat(options)))
  isValidList$ = this.userService
    .getOptions$('shop.is_valid')
    .pipe(map(options => [{ value: -1, label: '全部系统状态' }].concat(options)))
  constructor(
    private shopApi: ShopApi,
    private userService: UserService,
    private authService: AuthService
  ) {}
  @Effect()
  getList(query:GetListInput) {
    return this.shopApi.getList(query).pipe(tap((res:any) => {
      this.list$.commit(() => res.list)
      this.page$.commit(() => res.page)
      this.count$.commit(() => res.brand_shop_count)
    }))
  }
  beforeEach(to:ServiceRoute) {
    return this.getList(to.meta.query)
  }
}
