import { Injectable } from 'vue-service-app'
import { Effect } from 'rx-state'
import { Store } from '@/services/store'
import { CoachLevelApi, AddCoachLevelInput } from '@/api/v1/setting/coach/level'

interface AddState {}
@Injectable()
export class AddService extends Store<AddState> {
  constructor(protected coachLevelApi: CoachLevelApi) {
    super()
  }
  @Effect()
  addCoachLevel(params: AddCoachLevelInput) {
    return this.coachLevelApi.addCoachLevel(params)
  }
}
