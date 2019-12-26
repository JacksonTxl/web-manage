import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { ShopApi, GetShopBasicInput } from '@/api/v1/shop'
@Injectable()
export class SelectShopService {
  loading$ = new State({})
  constructor(private shopApi: ShopApi) {}
  @Effect()
  getShopBasic(params: GetShopBasicInput) {
    return this.shopApi.getShopBasic(params)
  }
}
