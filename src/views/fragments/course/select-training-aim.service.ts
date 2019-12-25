import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { TrainingApi } from '@/api/v1/special/training'

@Injectable()
export class SelectTrainingAimService {
  loading$ = new State({})
  constructor(private trainingApi: TrainingApi) {}
  @Effect()
  getTrainingAimList() {
    return this.trainingApi.getTrainingAimList()
  }
}
