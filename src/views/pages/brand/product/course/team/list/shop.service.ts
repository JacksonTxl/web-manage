import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { PersonalApi, SetShopInput, SetPriceInput } from '@/api/v1/course/personal'
@Injectable()
export class ShopService {
  constructor(personalApi: PersonalApi) {
  }
}
