import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { forkJoin } from 'rxjs'
import { Store } from '@/services/store'
import { SettingMemberApi } from '@/api/v1/setting/member'

interface ListState {
  resData: object
}
@Injectable()
export class UserLevelService extends Store<ListState> {
  state$: State<ListState>
  resData$: Computed<object>
  constructor(protected settingMemberApi: SettingMemberApi) {
    super()
    this.state$ = new State({
      resData: {}
    })
    this.resData$ = new Computed(this.state$.pipe(pluck('resData')))
  }
  @Effect()
  getList() {
    return this.settingMemberApi.getList().pipe(
      tap(res => {
        this.state$.commit(state => {
          state.resData = res
        })
      })
    )
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getList().subscribe(next, () => {
      next(false)
    })
  }
}
