import { Injectable } from 'vue-service-app'
import { Effect } from 'rx-state'
import { Store } from '@/services/store'
import { ShopApi, GetShopBasicInput } from '@/api/v1/shop'
@Injectable()
export class SelectShopService extends Store<any> {
  constructor(private shopApi: ShopApi) {
    super()
  }
  @Effect()
  getShopBasic(params: GetShopBasicInput) {
    return this.shopApi.getShopBasic(params)
  }
}
