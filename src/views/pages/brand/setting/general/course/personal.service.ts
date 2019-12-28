import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { State } from 'rx-state'
import { tap } from 'rxjs/operators'
import { PersonReserveSettingApi } from '@/api/v1/setting/course/personal/reserve'
import { CoursePricingApi } from '@/api/v1/setting/course/pricing'
import { AuthService } from '@/services/auth.service'
import { forkJoin } from 'rxjs'

@Injectable()
export class PersonalService implements Controller {
  resData$ = new State({})
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
  ) {}
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
        this.resData$.commit(() => res)
      })
    )
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.init()
  }
}
