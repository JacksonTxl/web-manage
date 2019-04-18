import { Injectable } from 'vue-service-app'
import { Effect } from 'rx-state'
import { Store } from '@/services/store'
import { TrainingApi, AddTrainingAimInput } from '@/api/v1/setting/training'

interface AddState {
}
@Injectable()
export class AddService extends Store<AddState> {
  constructor(protected trainingApi: TrainingApi) {
    super()
  }
  @Effect()
  addTrainingAim(params: AddTrainingAimInput) {
    return this.trainingApi.addTrainingAim(params)
  }
}
