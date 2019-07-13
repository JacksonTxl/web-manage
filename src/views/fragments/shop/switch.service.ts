import { Injectable, ServiceRouter } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap, switchMap } from 'rxjs/operators'
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
  @Effect()
  switchShop(params: SwitchShopInput) {
    return this.switchApi.switchShop(params).pipe(
      switchMap(res => {
        this.tokenService.SET_TOKEN(res.token)
        return this.userService.reload()
      }),
      tap(() => {
        this.router.push({ name: 'shop' })
      })
    )
  }
  @Effect()
  switchBackToBrand() {
    return this.switchApi.switchBackToBrand().pipe(
      switchMap(res => {
        this.tokenService.SET_TOKEN(res.token)
        return this.userService.reload()
      }),
      tap(() => {
        this.router.push({ name: 'brand' })
      })
    )
  }
}
