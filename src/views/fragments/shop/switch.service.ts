import { Injectable } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { ShopApi } from '@/api/v1/shop'
import { SwitchApi, SwitchShopInput } from '@/api/v1/account/switch'
import { TokenService } from '@/services/token.service'
import { UserService } from '@/services/user.service'

@Injectable()
export class SwitchService {
  shopList$ = new State([])
  constructor(
    private shopApi: ShopApi,
    private switchApi: SwitchApi,
    private tokenService: TokenService
  ) {}
  getShopList() {
    return this.shopApi.getShopList().pipe(
      tap(res => {
        this.shopList$.commit(() => res.list)
      })
    )
  }
  switchShop(params: SwitchShopInput) {
    return this.switchApi.switchShop(params).pipe(
      tap(res => {
        this.tokenService.SET_TOKEN(res.token)
      })
    )
  }
  switchBackToBrand() {
    return this.switchApi.switchBackToBrand().pipe(
      tap(res => {
        this.tokenService.SET_TOKEN(res.token)
      })
    )
  }
}
