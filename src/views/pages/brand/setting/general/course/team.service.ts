import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { TeamReserveSettingApi } from '@/api/v1/setting/course/team/reserve'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class TeamService {
  resData$ = new State({})
  loading$ = new State({})
  auth$ = this.authService.authMap$({
    get: 'brand:setting:course_price_reserve_setting|tab',
    edit: 'brand:setting:team_course_reserve_setting|edit'
  })
  constructor(
    private reserveSettingApi: TeamReserveSettingApi,
    private authService: AuthService
  ) {}
  @Effect()
  getInfo() {
    return this.reserveSettingApi.getInfo().pipe(
      tap(res => {
        this.resData$.commit(() => res)
      })
    )
  }
  beforeEach() {
    return this.getInfo()
  }
}
