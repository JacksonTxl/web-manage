import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { forkJoin } from 'rxjs'
import {
  PaymentSettingApi,
  UpdateInput
} from '@/api/v1/setting/payments'

interface ListState {
  resData: object
}
@Injectable()
export class PayTypeService extends Store<ListState> {
  state$: State<ListState>
  resData$: Computed<object>
  constructor(protected paymentSettingApi: PaymentSettingApi) {
    super()
    this.state$ = new State({
      resData: {}
    })
    this.resData$ = new Computed(this.state$.pipe(pluck('resData')))
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
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getInfo().subscribe(next, () => { next(false) })
  }
}
