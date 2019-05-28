import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { tap, pluck } from 'rxjs/operators'
import { State, Computed, Effect } from 'rx-state/src'
import { Store } from '@/services/store'
import { LongTermCabinetApi } from '@/api/v1/setting/cabinet/long-term'

interface SetState {
  resData: {}
}
@Injectable()
export class LongTermService extends Store<SetState> implements RouteGuard {
  state$: State<SetState>
  resData$: Computed<object>
  constructor(private cabinetApi: LongTermCabinetApi) {
    super()
    this.state$ = new State({
      resData: {}
    })
    this.resData$ = new Computed(this.state$.pipe(pluck('resData')))
  }
  getList(id: number) {
    return this.cabinetApi.getList(id).pipe(
      tap(res => {
        this.state$.commit(state => {
          state.resData = res
        })
      })
    )
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getList(to.meta.query.id).subscribe(next, () => {
      next(false)
    })
  }
}
