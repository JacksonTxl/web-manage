import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import {
  TeamReserveSettingApi,
  UpdateInput
} from '@/api/v1/setting/course/team/reserve'

@Injectable()
export class TeamReserveSettingService {
  loading$ = new State({})
  constructor(protected reserveSettingApi: TeamReserveSettingApi) {}
  getInfo() {
    return this.reserveSettingApi.getInfo()
  }
  @Effect()
  update(params: UpdateInput) {
    return this.reserveSettingApi.update(params)
  }
}
