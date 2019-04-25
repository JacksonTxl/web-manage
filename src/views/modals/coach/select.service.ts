import { Injectable } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { pluck, tap, debounceTime } from 'rxjs/operators'
import { Store } from '@/services/store'
import { CoachApi, GetSelectCoachInput } from '@/api/v1/staff/coach'

interface CoachState {
  list: Array<Object>
}
@Injectable()
export class SelectService extends Store<CoachState> {
  state$: State<CoachState>
  list$: Computed<Object>
  constructor(private coachApi: CoachApi) {
    super()
    this.state$ = new State({
      list: []
    })
    this.list$ = new Computed(this.state$.pipe(pluck('list')))
  }
  getCoachSelect(params: GetSelectCoachInput) {
    return this.coachApi.getCoachSelect(params).pipe(
      tap(res => {
        this.state$.commit(state => {
          state.list = res.coaches
        })
      })
    )
  }
}
