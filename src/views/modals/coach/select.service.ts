import { Injectable } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { CoachApi } from '@/api/coach'

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
  getCoachList() {
    return this.coachApi.getCoachList({}).pipe(
      tap(res => {
        this.state$.commit(state => {
          state.list = res.list
        })
      })
    )
  }
}
