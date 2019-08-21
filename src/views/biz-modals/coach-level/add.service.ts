import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { CoachLevelApi, AddCoachLevelInput } from '@/api/v1/setting/coach/level'

interface AddState {}
@Injectable()
export class AddService {
  loading$ = new State({})
  constructor(private coachLevelApi: CoachLevelApi) {}
  @Effect()
  addCoachLevel(params: AddCoachLevelInput) {
    return this.coachLevelApi.addCoachLevel(params)
  }
}
