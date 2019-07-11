import { Injectable } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { MemberApi } from '@/api/v1/member'
import { SwitchApi, SwitchShopInput } from '@/api/v1/account/switch'
import { TokenService } from '@/services/token.service'

interface ShopState {
  shopList: Array<Object>
}
@Injectable()
export class UserLableService extends Store<ShopState> {
  state$: State<ShopState>
  shopList$: Computed<Object>
  constructor(
    private shopApi: MemberApi,
    private switchApi: SwitchApi,
    private tokenService: TokenService
  ) {
    super()
    this.state$ = new State({
      shopList: []
    })
    this.shopList$ = new Computed(this.state$.pipe(pluck('shopList')))
  }
  getShopList() {
    return this.shopApi.getMemberLableList()
  }
  switchShop(params: SwitchShopInput) {
    return this.switchApi.switchShop(params).pipe(
      tap(res => {
        console.log(res)
        this.tokenService.SET_TOKEN(res.token)
      })
    )
  }
}
