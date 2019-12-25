import { Injectable } from 'vue-service-app'
import { State } from 'rx-state'
import { tap } from 'rxjs/operators'
import { MemberApi } from '@/api/v1/member'
import { SwitchApi, SwitchShopInput } from '@/api/v1/account/switch'
import { TokenService } from '@/services/token.service'

@Injectable()
export class UserLableService {
  loading$ = new State({})
  shopList$ = new State([])
  constructor(
    private shopApi: MemberApi,
    private switchApi: SwitchApi,
    private tokenService: TokenService
  ) {}
  getShopList() {
    return this.shopApi.getMemberLableList()
  }
  switchShop(params: SwitchShopInput) {
    return this.switchApi.switchShop(params).pipe(
      tap(res => {
        this.tokenService.SET_TOKEN(res.token)
      })
    )
  }
}
