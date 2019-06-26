import { Injectable } from 'vue-service-app'
import { Effect } from 'rx-state'
import { Store } from '@/services/store'
import { TrainingApi, AddTrainingAimInput } from '@/api/v1/setting/training'

@Injectable()
export class SelectTrainingAimService extends Store<any> {
  constructor(private trainingApi: TrainingApi) {
    super()
  }
  @Effect()
  getTrainingAimList() {
    return this.trainingApi.getTrainingAimList()
  }
  @Effect()
  addTrainingAims(params: AddTrainingAimInput) {
    this.trainingApi.addTrainingAim(params)
  }
}
