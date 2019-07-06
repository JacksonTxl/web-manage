import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck } from 'rxjs/operators'
import { Store } from '@/services/store'
import { ShopApi, ShopInput } from '@/api/v1/shop'
import { AuthService } from '@/services/auth.service'

interface ShopInfoState {
  shopInfo: any
}
@Injectable()
export class ShopService extends Store<ShopInfoState> {
  state$: State<ShopInfoState>
  shopInfo$: Computed<string>
  auth$: Computed<any>
  constructor(private shopApi: ShopApi, private authService: AuthService) {
    super()
    this.state$ = new State({
      shopInfo: {},
      auth: {
        edit: this.authService.can('brand_shop:shop:shop|edit')
      }
    })
    this.shopInfo$ = new Computed(this.state$.pipe(pluck('shopInfo')))
    this.auth$ = new Computed(this.state$.pipe(pluck('auth')))
  }
  SET_SHOP_INFO(shopInfo: ShopInfoState) {
    this.state$.commit(state => {
      state.shopInfo = shopInfo
    })
  }
  @Effect()
  getShopSettingInfo() {
    return this.shopApi.getShopSettingInfo()
  }
  save(data: ShopInput) {
    return this.shopApi.updateShop(data)
  }
  delImg(id: string, data: ShopInput) {
    return this.shopApi.update(id, data)
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getShopSettingInfo().subscribe(res => {
      console.log('门店设置详情', res)
      this.SET_SHOP_INFO(res)
      next()
    })
  }
}
