import { Injectable } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { CoachApi, GetCoachBasicInput } from '@/api/v1/staff/coach'

interface CoachState {
  list: Array<Object>
}
@Injectable()
export class SelectCoachService extends Store<CoachState> {
  state$: State<CoachState>
  list$: Computed<Object>
  constructor(private coachApi: CoachApi) {
    super()
    this.state$ = new State({
      list: []
    })
    this.list$ = new Computed(this.state$.pipe(pluck('list')))
  }
  @Effect()
  getCoachBasic(params: GetCoachBasicInput) {
    return this.coachApi.getCoachBasic(params).pipe(
      tap(res => {
        this.state$.commit(state => {
          state.list = res.coaches
        })
      })
    )
  }
}
