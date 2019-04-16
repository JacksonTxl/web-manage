import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck } from 'rxjs/operators'
import { Store } from '@/services/store'
import { CoachApi } from '@/api/coach'

interface CoachSelectState {
  list: any[]
}
@Injectable()
export class SelectService extends Store<CoachSelectState> {
  state$: State<CoachSelectState>
  list$: Computed<any>
  constructor(private coachApi: CoachApi) {
    super()
    this.state$ = new State({
      list: []
    })
    this.list$ = new Computed(this.state$.pipe(pluck('list')))
  }
  protected getCoachList(query = {}) {
    return this.coachApi.getCoachList(query)
  }
}
