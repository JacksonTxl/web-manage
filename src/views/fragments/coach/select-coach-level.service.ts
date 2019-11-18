import { Injectable } from 'vue-service-app'
import { Effect } from 'rx-state'
import { Store } from '@/services/store'
import { CoachApi } from '@/api/v1/special/coach'
@Injectable()
export class SelectCoachLevelService extends Store<any> {
  constructor(private coachApi: CoachApi) {
    super()
  }
  @Effect()
  getCoachLevelList() {
    return this.coachApi.getCoachLevelList()
  }
}
