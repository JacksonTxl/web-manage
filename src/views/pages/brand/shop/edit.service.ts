import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { ShopApi, ShopInput } from '@/api/v1/shop'
import { State, Computed } from 'rx-state'
import { Store } from '@/services/store'
import { pluck } from 'rxjs/operators'
interface ShopState {
  /**
   * 门店详情
   */
  shopInfo: any
}
@Injectable()
export class EditService extends Store<ShopState> implements RouteGuard {
  state$: State<ShopState>
  shopInfo$: Computed<any>
  constructor(private shopApi: ShopApi) {
    super()
    this.state$ = new State({
      shopInfo: {}
    })
    this.shopInfo$ = new Computed(this.state$.pipe(pluck('shopInfo')))
  }
  getShopInfo(id:string) {
    return this.shopApi.getInfo(id)
  }
  SET_SHOP_INFO(info:any) {
    this.state$.commit(state => {
      state.shopInfo = info
    })
  }
  beforeRouteEnter(to:ServiceRoute, from:ServiceRoute, next:()=>{}) {
    this.getShopInfo('1').subscribe((res:any) => {
      this.SET_SHOP_INFO(res.shop_info)
    })
    next()
  }
}
