import { Injectable } from 'vue-service-app'
import { Effect } from 'rx-state'
import { Store } from '@/services/store'
import { CoachLevelApi, UpdateCoachLevelInput } from '@/api/v1/setting/coach/level'

interface EditState {
}
@Injectable()
export class EditService extends Store<EditState> {
  constructor(protected coachLevelApi: CoachLevelApi) {
    super()
  }
  @Effect()
  updateCoachLevel(params: UpdateCoachLevelInput) {
    return this.coachLevelApi.updateCoachLevel(params)
  }
}
