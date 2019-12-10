import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { GroupReserveSettingApi } from '@/api/v1/setting/course/group/reserve'
import { AuthService } from '@/services/auth.service'
import { forkJoin } from 'rxjs'

@Injectable()
export class GroupService {
  state$: State<any>
  resData$: Computed<object>
  loading$ = new State({})
  auth$ = this.authService.authMap$({
    priceGet: 'brand:setting:course_price_reserve_setting|tab',
    priceEdit: 'brand:setting:personal_course_price_setting|edit',
    reserveEdit: 'brand:setting:personal_course_reserve_setting|edit'
  })
  constructor(
    private reserveSettingApi: GroupReserveSettingApi,
    private authService: AuthService
  ) {
    this.state$ = new State({
      resData: {}
    })
    this.resData$ = new Computed(this.state$.pipe(pluck('resData')))
  }
  getInfo() {
    return this.reserveSettingApi.getInfo()
  }
  init() {
    return forkJoin(this.getInfo()).pipe(
      tap(res => {
        this.state$.commit(state => {
          state.resData = res
        })
      })
    )
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.init()
  }
}
