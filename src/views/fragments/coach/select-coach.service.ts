import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { CoachApi, GetCoachBasicInput } from '@/api/v1/staff/coach'
@Injectable()
export class SelectCoachService {
  loading$ = new State({})
  constructor(private coachApi: CoachApi) {}
  @Effect()
  getCoachBasic(params: GetCoachBasicInput) {
    return this.coachApi.getCoachBasic(params)
  }
}
