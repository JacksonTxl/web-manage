import { Injectable } from 'vue-service-app'
import { Effect } from 'rx-state'
import { Store } from '@/services/store'
import { CoachLevelApi } from '@/api/v1/setting/coach/level'
@Injectable()
export class SelectCoachLevelService extends Store<any> {
  constructor(private coachLevelApi: CoachLevelApi) {
    super()
  }
  @Effect()
  getCoachLevelList() {
    return this.coachLevelApi.getCoachLevelList()
  }
}
