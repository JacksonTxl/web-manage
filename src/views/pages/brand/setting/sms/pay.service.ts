import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { AuthService } from '@/services/auth.service'
import { RedirectService } from '@/services/redirect.service'
import {
  PayApi,
  PostSmsSignParams,
  PostSmsPayParams,
  GetSmsPayInfoQuery
} from '@/api/v1/setting/sms/pay'
interface SetState {}
@Injectable()
export class PayService extends Store<SetState> implements RouteGuard {
  state$: State<SetState>
  info$ = new State([])
  page$ = new State([])
  constructor(private PayApi: PayApi) {
    super()
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
  postSmsPay(params: PostSmsPayParams) {
    return this.PayApi.postSmsPay(params)
  }
  beforeEach(to: ServiceRoute) {
    return this.getSmsPayInfo(to.meta.query)
  }
}
