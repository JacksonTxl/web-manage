import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { forkJoin } from 'rxjs'
import { AuthService } from '@/services/auth.service'
import { PaymentSettingApi, UpdateInput } from '@/api/v1/setting/payments'

interface ListState {
  resData: object
}
@Injectable()
export class PayTypeService extends Store<ListState> {
  state$: State<ListState>
  resData$: Computed<object>
  auth$: Computed<object>
  constructor(
    private paymentSettingApi: PaymentSettingApi,
    private authService: AuthService
  ) {
    super()
    this.state$ = new State({
      resData: {},
      auth: {
        /**
         * 查看支付配置
         */
        get: this.authService.can('brand:setting:payment_method|get'),
        /**
         * 编辑支付配置
         */
        edit: this.authService.can('brand:setting:payment_method|edit')
      }
    })
    this.resData$ = new Computed(this.state$.pipe(pluck('resData')))
    this.auth$ = new Computed(this.state$.pipe(pluck('auth')))
  }
  @Effect()
  init() {
    return forkJoin(this.getInfo)
  }
  getInfo() {
    return this.paymentSettingApi.getInfo().pipe(
      tap(res => {
        this.state$.commit(state => {
          state.resData = res
        })
      })
    )
  }
  update(params: UpdateInput) {
    return this.paymentSettingApi.update(params)
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getInfo()
  }
}
