import { Injectable } from 'vue-service-app'
import { Effect } from 'rx-state'
import { Store } from '@/services/store'
import { TrainingApi, UpdateTrainingAimInput } from '@/api/v1/setting/training'

interface EditState {
}
@Injectable()
export class EditService extends Store<EditState> {
  constructor(protected trainingApi: TrainingApi) {
    super()
  }
  @Effect()
  updateTrainingAim(params: UpdateTrainingAimInput) {
    return this.trainingApi.updateTrainingAim(params)
  }
}
