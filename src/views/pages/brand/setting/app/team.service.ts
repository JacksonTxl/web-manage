import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import {
  TeamReserveSettingApi
} from '@/api/v1/setting/course/team/reserve'

interface ListState {
  resData: object
}
@Injectable()
export class TeamService extends Store<ListState> {
  state$: State<ListState>
  resData$: Computed<object>
  constructor(protected reserveSettingApi: TeamReserveSettingApi) {
    super()
    this.state$ = new State({
      resData: {}
    })
    this.resData$ = new Computed(this.state$.pipe(pluck('resData')))
  }
  @Effect()
  getInfo() {
    return this.reserveSettingApi.getInfo().pipe(
      tap(res => {
        this.state$.commit(state => {
          state.resData = res
        })
      })
    )
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getInfo().subscribe(next, () => { next(false) })
  }
}
