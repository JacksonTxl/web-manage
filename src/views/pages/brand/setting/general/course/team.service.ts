import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { TeamReserveSettingApi } from '@/api/v1/setting/course/team/reserve'
import { AuthService } from '@/services/auth.service'

interface ListState {
  resData: object
}
@Injectable()
export class TeamService extends Store<ListState> {
  state$: State<ListState>
  resData$: Computed<object>
  auth$ = this.authService.authMap({
    get: 'brand:setting:team_course_reserve_setting|get',
    edit: 'brand:setting:team_course_reserve_setting|edit'
  })
  constructor(
    private reserveSettingApi: TeamReserveSettingApi,
    private authService: AuthService
  ) {
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
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getInfo().subscribe(next, () => { next(false) })
  }
}
