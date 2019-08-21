import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { TrainingApi, UpdateTrainingAimInput } from '@/api/v1/setting/training'

interface EditState {}
@Injectable()
export class EditService {
  loading$ = new State({})
  constructor(protected trainingApi: TrainingApi) {}
  @Effect()
  updateTrainingAim(params: UpdateTrainingAimInput) {
    return this.trainingApi.updateTrainingAim(params)
  }
}
