import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { CoachLevelApi, GetCoachLevelListInput, DeleteCoachLevelInput } from '@/api/v1/setting/coach/level'

interface ListState {
  resData: object
}
@Injectable()
export class ListService extends Store<ListState> {
  state$: State<ListState>
  resData$: Computed<object>
  constructor(protected coachLevelApi: CoachLevelApi) {
    super()
    this.state$ = new State({
      resData: {}
    })
    this.resData$ = new Computed(this.state$.pipe(pluck('resData')))
  }
  getCoachLevelList(query: GetCoachLevelListInput) {
    return this.coachLevelApi.getCoachLevelList(query).pipe(
      tap(res => {
        this.SET_STATE(res)
      })
    )
  }
  refreshCoachLevelList(query: GetCoachLevelListInput) {
    this.getCoachLevelList(query).subscribe()
  }
  deleteCoachLevel(params: DeleteCoachLevelInput) {
    return this.coachLevelApi.deleteCoachLevel(params)
  }
  protected SET_STATE(data: any) {
    this.state$.commit(state => {
      state.resData = data
    })
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getCoachLevelList({ page: to.meta.query.page, size: 20 }).subscribe(() => {
      next()
    }, () => {
      next(false)
    })
  }
}
