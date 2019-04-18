import { Injectable } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { TrainingApi, AddTrainingAimInput } from '@/api/v1/setting/training'

interface TrainingAimState {
  list: Array<Object>
}
@Injectable()
export class SelectTrainingAimService extends Store<TrainingAimState> {
  state$: State<TrainingAimState>
  list$: Computed<Object>
  constructor(private trainingApi: TrainingApi) {
    super()
    this.state$ = new State({
      list: []
    })
    this.list$ = new Computed(this.state$.pipe(pluck('list')))
  }
  protected getTrainingAimList() {
    return this.trainingApi.getTrainingAimList({ size: 100 }).pipe(
      tap(res => {
        this.state$.commit(state => {
          state.list = res.list
        })
      })
    )
  }
  protected addTrainingAims(params: AddTrainingAimInput) {
    this.trainingApi.addTrainingAim(params)
  }
}
