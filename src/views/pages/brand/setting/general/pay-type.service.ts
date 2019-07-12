import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { forkJoin } from 'rxjs'
import { AuthService } from '@/services/auth.service'
import { PaymentSettingApi, UpdateInput } from '@/api/v1/setting/payments'
import { WechatPaymentSettingApi } from '@/api/v1/setting/payments/wechat'

@Injectable()
export class PayTypeService implements RouteGuard {
  loading$ = new State({})
  info$ = new State({})
  wechatPaymentInfo$ = new State({})
  auth$ = this.authService.authMap({
    get: 'brand:setting:payment_method|get',
    edit: 'brand:setting:payment_method|edit'
  })
  constructor(
    private paymentSettingApi: PaymentSettingApi,
    private authService: AuthService,
    private wechatPaymentSettingApi: WechatPaymentSettingApi
  ) {}
  @Effect()
  init() {
    return forkJoin(
      this.getWechatPaymentInfo(),
      this.getInfo()
    ).pipe(
      tap(res => {
        this.wechatPaymentInfo$.commit(() => res[0])
        this.info$.commit(() => res[1])
      }
      )
    )
  }
  getInfo() {
    return this.paymentSettingApi.getInfo()
  }
  getWechatPaymentInfo() {
    return this.wechatPaymentSettingApi.getInfo()
  }
  update(params: UpdateInput) {
    return this.paymentSettingApi.update(params)
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.init()
  }
}
