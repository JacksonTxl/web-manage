import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'
import { PaymentSettingApi, UpdateInput } from '@/api/v1/setting/payments'

@Injectable()
export class PayTypeService implements RouteGuard {
  loading$ = new State({})
  info$ = new State({})
  auth$ = this.authService.authMap({
    get: 'brand:setting:payment_method|get',
    edit: 'brand:setting:payment_method|edit'
  })
  constructor(
    private paymentSettingApi: PaymentSettingApi,
    private authService: AuthService
  ) {}
  @Effect()
  init() {
    return this.getInfo().pipe(
      tap(res => {
        this.info$.commit(() => res)
      })
    )
  }
  getInfo() {
    return this.paymentSettingApi.getInfo()
  }
  update(params: UpdateInput) {
    return this.paymentSettingApi.update(params)
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.init()
  }
}
