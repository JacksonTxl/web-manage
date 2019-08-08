import { Injectable } from 'vue-service-app'
import { Effect } from 'rx-state'
import { Store } from '@/services/store'
import { CoursePricingApi, UpdateInput } from '@/api/v1/setting/course/pricing'

@Injectable()
export class CoursePriceModelSettingService extends Store<any> {
  constructor(protected coursePricingApi: CoursePricingApi) {
    super()
  }
  getInfo() {
    return this.coursePricingApi.getInfo()
  }
  del() {
    return this.coursePricingApi.del()
  }
  @Effect()
  update(params: UpdateInput) {
    return this.coursePricingApi.update(params)
  }
}
