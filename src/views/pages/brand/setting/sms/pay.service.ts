import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import {
  PayApi,
  PostSmsSignParams,
  GetSmsPayInfoQuery
} from '@/api/v1/setting/sms/pay'
interface SetState {}
@Injectable()
export class PayService implements RouteGuard {
  state$: State<SetState>
  info$ = new State([])
  page$ = new State([])
  loading$ = new State({})
  constructor(private PayApi: PayApi) {
    this.state$ = new State({})
  }
  @Effect()
  getSmsPayInfo(query: GetSmsPayInfoQuery) {
    return this.PayApi.getSmsPayInfo(query).pipe(
      tap((res: any) => {
        this.info$.commit(() => res.info)
        this.page$.commit(() => res.info.page)
      })
    )
  }
  postSmsSign(params: PostSmsSignParams) {
    return this.PayApi.postSmsSign(params).pipe(tap((res: any) => {}))
  }

  beforeEach(to: ServiceRoute) {
    return this.getSmsPayInfo(to.meta.query)
  }
}
