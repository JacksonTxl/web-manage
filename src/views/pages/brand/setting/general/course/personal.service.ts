import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { PersonReserveSettingApi } from '@/api/v1/setting/course/personal/reserve'
import { CoursePricingApi } from '@/api/v1/setting/course/pricing'
import { AuthService } from '@/services/auth.service'
import { forkJoin } from 'rxjs'

interface ListState {
  resData: object
}
@Injectable()
export class PersonalService {
  state$: State<ListState>
  resData$: Computed<object>
  loading$ = new State({})
  auth$ = this.authService.authMap$({
    priceGet: 'brand:setting:course_price_reserve_setting|tab',
    priceEdit: 'brand:setting:personal_course_price_setting|edit',
    reserveEdit: 'brand:setting:personal_course_reserve_setting|edit'
  })
  constructor(
    private reserveSettingApi: PersonReserveSettingApi,
    private coursePricingApi: CoursePricingApi,
    private authService: AuthService
  ) {
    this.state$ = new State({
      resData: {}
    })
    this.resData$ = new Computed(this.state$.pipe(pluck('resData')))
  }
  getPriceSettingInfo() {
    return this.coursePricingApi.getInfo()
  }
  getReserveSettingInfo() {
    return this.reserveSettingApi.getInfo()
  }
  del() {
    return this.coursePricingApi.del()
  }
  init() {
    return forkJoin(
      this.getPriceSettingInfo(),
      this.getReserveSettingInfo()
    ).pipe(
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
