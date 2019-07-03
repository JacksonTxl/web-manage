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
export class PersonalService extends Store<ListState> {
  state$: State<ListState>
  resData$: Computed<object>
  auth$: Computed<object>
  constructor(
    private reserveSettingApi: PersonReserveSettingApi,
    private coursePricingApi: CoursePricingApi,
    private authService: AuthService
  ) {
    super()
    this.state$ = new State({
      resData: {},
      auth: {
        /**
         * 私教课定价查看与编辑
         */
        price: {
          get: this.authService.can('brand:setting:personal_course_price_setting|get'),
          edit: this.authService.can('brand:setting:personal_course_price_setting|edit')
        },
        /**
         * 私教课程预约设置查看与编辑
         */
        reserve: {
          get: this.authService.can('brand:setting:personal_course_reserve_setting|get'),
          edit: this.authService.can('brand:setting:personal_course_reserve_setting|edit')
        }
      }
    })
    this.resData$ = new Computed(this.state$.pipe(pluck('resData')))
    this.auth$ = new Computed(this.state$.pipe(pluck('auth')))
  }
  getPriceSettingInfo() {
    return this.coursePricingApi.getInfo()
  }
  getReserveSettingInfo() {
    return this.reserveSettingApi.getInfo()
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
