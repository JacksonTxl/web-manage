import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { ShopHolidayApi, SetInput } from '@/api/v1/brand/shop-holiday'

@Injectable()
export class HolidayService {
  loading$ = new State({})
  constructor(private shopHolidayApi: ShopHolidayApi) {}
  @Effect()
  set(params: SetInput) {
    return this.shopHolidayApi.set(params)
  }
  del(id: number) {
    return this.shopHolidayApi.del(id)
  }
}
