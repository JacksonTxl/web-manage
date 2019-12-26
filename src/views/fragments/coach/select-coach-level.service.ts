import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { CoachApi } from '@/api/v1/special/coach'
@Injectable()
export class SelectCoachLevelService {
  loading$ = new State({})
  constructor(private coachApi: CoachApi) {}
  @Effect()
  getCoachLevelList() {
    return this.coachApi.getCoachLevelList()
  }
}
