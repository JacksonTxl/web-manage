import { Injectable } from 'vue-service-app'
import { Effect } from 'rx-state'
import { Store } from '@/services/store'
import { ShopStatusApi, UpdateInput } from '@/api/v1/shop/status'

interface SetState {
}
@Injectable()
export class ShopHolidayService extends Store<SetState> {
  constructor(protected shopStatusApi: ShopStatusApi) {
    super()
  }
  @Effect()
  update(params: UpdateInput) {
    return this.shopStatusApi.update(params)
  }
}
