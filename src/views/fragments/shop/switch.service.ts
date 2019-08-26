import { Injectable, ServiceRouter } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap, switchMap } from 'rxjs/operators'
import { SwitchApi, SwitchShopInput } from '@/api/v1/account/switch'
import { TokenService } from '@/services/token.service'
import { UserService } from '@/services/user.service'

@Injectable()
export class SwitchService {
  shopList$ = this.userService.shopList$
  loading$ = new State({})
  constructor(
    private switchApi: SwitchApi,
    private tokenService: TokenService,
    private userService: UserService,
    private router: ServiceRouter
  ) {}
  @Effect()
  switchShop(params: SwitchShopInput) {
    return this.switchApi.switchShop(params).pipe(
      tap(res => {
        this.tokenService.SET_TOKEN(res.token)
        this.userService.SET_FIRST_INITED(false)
        this.router.push({
          name: 'index',
          query: {
            app_brand_id: this.router.currentRoute.query.app_brand_id,
            app_shop_id: params.shop_id
          }
        })
      })
    )
  }
  @Effect()
  switchBackToBrand() {
    return this.switchApi.switchBackToBrand().pipe(
      tap(res => {
        this.tokenService.SET_TOKEN(res.token)
        this.userService.SET_FIRST_INITED(false)
        this.router.push({
          name: 'index',
          query: {
            app_brand_id: this.router.currentRoute.query.app_brand_id,
            app_shop_id: 0
          }
        })
      })
    )
  }
}
