import { Injectable } from 'vue-service-app'
import { Effect } from 'rx-state'
import { Store } from '@/services/store'
import { ShopHolidayApi, AddInput } from '@/api/v1/brand/shop-holiday'

@Injectable()
export class HolidayService extends Store<any> {
  constructor(protected shopHolidayApi: ShopHolidayApi) {
    super()
  }
  @Effect()
  add(params: AddInput) {
    return this.shopHolidayApi.add(params)
  }
}
