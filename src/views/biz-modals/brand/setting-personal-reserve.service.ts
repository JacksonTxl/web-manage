import { Injectable } from 'vue-service-app'
import { Effect } from 'rx-state'
import { Store } from '@/services/store'
import {
  PersonReserveSettingApi,
  UpdateInput
} from '@/api/v1/setting/course/personal/reserve'

@Injectable()
export class PersonalReserveSettingService extends Store<any> {
  constructor(protected reserveSettingApi: PersonReserveSettingApi) {
    super()
  }
  getInfo() {
    return this.reserveSettingApi.getInfo()
  }
  @Effect()
  update(params: UpdateInput) {
    return this.reserveSettingApi.update(params)
  }
}
