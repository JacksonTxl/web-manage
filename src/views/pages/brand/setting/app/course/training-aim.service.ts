import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { TrainingApi, GetTrainingAimListInput, DeleteTrainingAimInput } from '@/api/v1/setting/training'

interface ListState {
  resData: object
}
@Injectable()
export class TrainingAimService extends Store<ListState> {
  state$: State<ListState>
  resData$: Computed<object>
  constructor(protected trainingApi: TrainingApi) {
    super()
    this.state$ = new State({
      resData: {}
    })
    this.resData$ = new Computed(this.state$.pipe(pluck('resData')))
  }
  getTrainingAimList(query: GetTrainingAimListInput) {
    return this.trainingApi.getTrainingAimList(query).pipe(
      tap(res => {
        this.SET_STATE(res)
      })
    )
  }
  deleteTrainingAim(params: DeleteTrainingAimInput) {
    return this.trainingApi.deleteTrainingAim(params)
  }
  protected SET_STATE(data: ListState) {
    this.state$.commit(state => {
      state.resData = data
    })
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getTrainingAimList({ page: to.meta.query.page, size: 100 }).subscribe(() => {
      next()
    }, () => {
      next(false)
    })
  }
}
