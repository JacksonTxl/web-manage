import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { SkillfulApi, GetSkillfulListInput, DeleteSkillfulInput } from '@/api/v1/setting/skillful'

interface ListState {
  list: any[],
  page: object
}
@Injectable()
export class ListService extends Store<ListState> {
  state$: State<ListState>
  list$: Computed<any[]>
  page$: Computed<object>
  constructor(protected skillfulApi: SkillfulApi) {
    super()
    this.state$ = new State({
      list: [],
      page: {}
    })
    this.list$ = new Computed(this.state$.pipe(pluck('list')))
    this.page$ = new Computed(this.state$.pipe(pluck('page')))
  }
  getSkillfulList(query: GetSkillfulListInput) {
    return this.skillfulApi.getSkillfulList(query).pipe(
      tap(res => {
        this.SET_STATE(res)
      })
    )
  }
  refreshSkillfulList(query: GetSkillfulListInput) {
    this.getSkillfulList(query).subscribe()
  }
  deleteSkillful(params: DeleteSkillfulInput) {
    return this.skillfulApi.deleteSkillful(params)
  }
  protected SET_STATE(data: ListState) {
    this.state$.commit(state => {
      state.list = data.list
      state.page = data.page
    })
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getSkillfulList({ page: to.meta.query.page, size: 20 }).subscribe(() => {
      next()
    }, () => {
      next(false)
    })
  }
}
