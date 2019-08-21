import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import {
  CoachLevelApi,
  UpdateCoachLevelInput
} from '@/api/v1/setting/coach/level'

@Injectable()
export class EditService {
  loading$ = new State({})
  constructor(protected coachLevelApi: CoachLevelApi) {}
  @Effect()
  updateCoachLevel(params: UpdateCoachLevelInput) {
    return this.coachLevelApi.updateCoachLevel(params)
  }
}
