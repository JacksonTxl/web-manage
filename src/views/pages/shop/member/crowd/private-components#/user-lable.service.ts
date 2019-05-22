import { Injectable } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { MemberAPi } from '@/api/v1/member'
import { SwitchApi, SwitchShopInput } from '@/api/v1/account/switch'
import { AuthService } from '@/services/auth.service'

interface ShopState {
  shopList: Array<Object>
}
@Injectable()
export class UserLableService extends Store<ShopState> {
  state$: State<ShopState>
  shopList$: Computed<Object>
  constructor(
    private shopApi: MemberAPi,
    private switchApi: SwitchApi,
    private authService: AuthService
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
        this.authService.SET_TOKEN(res.token)
      })
    )
  }
}
