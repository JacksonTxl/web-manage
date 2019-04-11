import { ServiceRoute } from 'vue-service-app'
import { SetService } from './set.service'
import { PersonalApi, SetShopInput, SetPriceInput } from '@/api/v1/course/personal'

export class AddService extends SetService {
  constructor(personalApi: PersonalApi) {
    super(personalApi)
  }
  protected setShop(params: SetShopInput) {
    return this.personalApi.setShop(params)
  }
  protected setPrice(params: SetPriceInput) {
    return this.personalApi.setPrice(params)
  }
}
