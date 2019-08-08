import { Injectable } from 'vue-service-app'
import { Effect } from 'rx-state'
import { Store } from '@/services/store'
import { ShopHolidayApi, SetInput } from '@/api/v1/brand/shop-holiday'

interface SetState {}

@Injectable()
export class HolidayService extends Store<SetState> {
  constructor(protected shopHolidayApi: ShopHolidayApi) {
    super()
  }
  @Effect()
  set(params: SetInput) {
    return this.shopHolidayApi.set(params)
  }
  del(id: number) {
    return this.shopHolidayApi.del(id)
  }
}
