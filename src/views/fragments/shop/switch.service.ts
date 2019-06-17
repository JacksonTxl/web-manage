import { Injectable } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { ShopApi } from '@/api/v1/shop'
import { SwitchApi, SwitchShopInput } from '@/api/v1/account/switch'
import { TokenService } from '@/services/token.service'
import { UserService } from '@/services/user.service'

interface SetState {
  shopList: Array<Object>
}
@Injectable()
export class SwitchService extends Store<SetState> {
  state$: State<SetState>
  shopList$: Computed<Object>
  constructor(
    private shopApi: ShopApi,
    private switchApi: SwitchApi,
    private tokenService: TokenService,
    private userService: UserService
  ) {
    super()
    this.state$ = new State({
      shopList: []
    })
    this.shopList$ = new Computed(this.state$.pipe(pluck('shopList')))
  }
  getShopList() {
    return this.shopApi.getShopList()
  }
  switchShop(params: SwitchShopInput) {
    return this.switchApi.switchShop(params).pipe(
      tap(res => {
        console.log(res)
        this.tokenService.SET_TOKEN(res.token)
        // this.userService.SET_SHOP({
        //   name: 'test shop'
        // })
      })
    )
  }
  switchBackToBrand() {
    return this.switchApi.switchBackToBrand().pipe(
      tap(res => {
        console.log(res)
        this.tokenService.SET_TOKEN(res.token)
      })
    )
  }
}
