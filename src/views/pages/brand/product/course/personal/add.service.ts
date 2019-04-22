import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { Effect } from 'rx-state/src'
import { Store } from '@/services/store'
import { PersonalApi, SetPersonalBrandInput, SetShopInput, SetPriceInput } from '@/api/v1/course/personal'
interface AddState {

}
@Injectable()
export class AddService extends Store<AddState> {
  constructor(private personalApi: PersonalApi) {
    super()
  }
  @Effect()
  addPersonalBrand(params: SetPersonalBrandInput) {
    return this.personalApi.addPersonalBrand(params)
  }
  @Effect()
  setShop(params: SetShopInput) {
    return this.personalApi.setShop(params)
  }
  @Effect()
  setPrice(params: SetPriceInput) {
    return this.personalApi.setPrice(params)
  }
}
