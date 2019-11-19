import { Injectable } from 'vue-service-app'
import { Effect } from 'rx-state'
import { Store } from '@/services/store'
import { TrainingApi } from '@/api/v1/special/training'

@Injectable()
export class SelectTrainingAimService extends Store<any> {
  constructor(private trainingApi: TrainingApi) {
    super()
  }
  @Effect()
  getTrainingAimList() {
    return this.trainingApi.getTrainingAimList()
  }
}
