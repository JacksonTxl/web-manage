import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { TrainingApi, GetTrainingAimListInput, DeleteTrainingAimInput } from '@/api/v1/setting/training'

interface ListState {
  list: any[],
  page: object
}
@Injectable()
export class ListService extends Store<ListState> {
  state$: State<ListState>
  list$: Computed<any[]>
  page$: Computed<object>
  constructor(protected trainingApi: TrainingApi) {
    super()
    this.state$ = new State({
      list: [],
      page: {}
    })
    this.list$ = new Computed(this.state$.pipe(pluck('list')))
    this.page$ = new Computed(this.state$.pipe(pluck('page')))
  }
  getTrainingAimList(query: GetTrainingAimListInput) {
    return this.trainingApi.getTrainingAimList(query).pipe(
      tap(res => {
        this.SET_STATE(res)
      })
    )
  }
  refreshTrainingAimList(query: GetTrainingAimListInput) {
    this.getTrainingAimList(query).subscribe()
  }
  deleteTrainingAim(params: DeleteTrainingAimInput) {
    return this.trainingApi.deleteTrainingAim(params)
  }
  protected SET_STATE(data: ListState) {
    this.state$.commit(state => {
      state.list = data.list
      state.page = data.page
    })
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getTrainingAimList({ page: to.meta.query.page, size: 20 }).subscribe(() => {
      next()
    }, () => {
      next(false)
    })
  }
}
