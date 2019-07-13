import { Injectable, ServiceRouter } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { ShopApi } from '@/api/v1/shop'
import { SwitchApi, SwitchShopInput } from '@/api/v1/account/switch'
import { TokenService } from '@/services/token.service'
import { UserService } from '@/services/user.service'
import { forkJoin } from 'rxjs'

@Injectable()
export class SwitchService {
  shopList$ = new State([])
  loading$ = new State({})
  constructor(
    private shopApi: ShopApi,
    private switchApi: SwitchApi,
    private tokenService: TokenService,
    private userService: UserService,
    private router: ServiceRouter
  ) {}
  getShopList() {
    return this.shopApi.getShopList().pipe(
      tap(res => {
        this.shopList$.commit(() => res.list)
      })
    )
  }
  switchSuccess(type: string) {
    forkJoin([
      this.userService.getMenuData(),
      this.userService.getUser()
    ]).subscribe(() => {
      this.router.push({
        name: type
      })
    })
  }
  @Effect()
  switchShop(params: SwitchShopInput) {
    return this.switchApi.switchShop(params).pipe(
      tap(res => {
        this.tokenService.SET_TOKEN(res.token)
        this.switchSuccess('shop')
      })
    )
  }
  @Effect()
  switchBackToBrand() {
    return this.switchApi.switchBackToBrand().pipe(
      tap(res => {
        this.tokenService.SET_TOKEN(res.token)
        this.switchSuccess('brand')
      })
    )
  }
}
