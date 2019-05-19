import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import {
  CourtApi
} from '@/api/v1/shop/area'

interface ListState {
  list: object[]
}
@Injectable()
export class ListService extends Store<ListState> {
  state$: State<ListState>
  list$: Computed<object[]>
  constructor(protected courtApi: CourtApi) {
    super()
    this.state$ = new State({
      list: []
    })
    this.list$ = new Computed(this.state$.pipe(pluck('list')))
  }
  protected SET_STATE(list: object[]) {
    this.state$.commit(state => {
      state.list = list
    })
  }
  @Effect()
  getList() {
    return this.courtApi.getList().pipe(
      tap(res => {
        this.SET_STATE(res.list)
      })
    )
  }
  del(id: number) {
    return this.courtApi.del(id)
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getList().subscribe(next, () => { next(false) })
  }
}
