import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { TrainingApi, AddTrainingAimInput } from '@/api/v1/setting/training'

interface AddState {}
@Injectable()
export class AddService {
  loading$ = new State({})
  constructor(private trainingApi: TrainingApi) {}
  @Effect()
  addTrainingAim(params: AddTrainingAimInput) {
    return this.trainingApi.addTrainingAim(params)
  }
}
