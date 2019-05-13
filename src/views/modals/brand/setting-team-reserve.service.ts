import { Injectable } from 'vue-service-app'
import { Effect } from 'rx-state'
import { Store } from '@/services/store'
import {
  TeamReserveSettingApi,
  UpdateInput
} from '@/api/v1/setting/course/team/reserve'

@Injectable()
export class TeamReserveSettingService extends Store<any> {
  constructor(protected reserveSettingApi: TeamReserveSettingApi) {
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
