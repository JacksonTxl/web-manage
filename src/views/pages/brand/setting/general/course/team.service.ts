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
  auth$: Computed<object>
  constructor(
    private reserveSettingApi: TeamReserveSettingApi,
    private authService: AuthService
  ) {
    super()
    this.state$ = new State({
      resData: {},
      auth: {
        /**
         * 团课程预约设置查看与编辑
         */
        reserve: {
          get: this.authService.can('brand:setting:team_course_reserve_setting|get'),
          edit: this.authService.can('brand:setting:team_course_reserve_setting|edit')
        }
      }
    })
    this.resData$ = new Computed(this.state$.pipe(pluck('resData')))
    this.auth$ = new Computed(this.state$.pipe(pluck('auth')))
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
