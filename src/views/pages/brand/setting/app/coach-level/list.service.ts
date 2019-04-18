import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { CoachLevelApi, GetCoachLevelListInput, DeleteCoachLevelInput } from '@/api/v1/setting/coach/level'

interface ListState {
  list: any[],
  page: object
}
@Injectable()
export class ListService extends Store<ListState> {
  state$: State<ListState>
  list$: Computed<any[]>
  page$: Computed<object>
  constructor(protected coachLevelApi: CoachLevelApi) {
    super()
    this.state$ = new State({
      list: [],
      page: {}
    })
    this.list$ = new Computed(this.state$.pipe(pluck('list')))
    this.page$ = new Computed(this.state$.pipe(pluck('page')))
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
      state.list = data.levels
      state.page = data.page
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
