import { Injectable } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { CoachLevelApi } from '@/api/v1/setting/coach/level'

interface CoachLevelState {
  list: Array<Object>
}
@Injectable()
export class SelectCoachLevelService extends Store<CoachLevelState> {
  state$: State<CoachLevelState>
  list$: Computed<Object>
  constructor(private coachLevelApi: CoachLevelApi) {
    super()
    this.state$ = new State({
      list: []
    })
    this.list$ = new Computed(this.state$.pipe(pluck('list')))
  }
  getCoachLevelList() {
    return this.coachLevelApi.getCoachLevelList({}).pipe(
      tap(res => {
        this.state$.commit(state => {
          state.list = res.list
        })
      })
    )
  }
}
