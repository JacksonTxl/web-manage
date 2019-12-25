import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import {
  PayApi,
  PostSmsSignParams,
  GetSmsPayInfoQuery
} from '@/api/v1/setting/sms/pay'
@Injectable()
export class PayService implements Controller {
  info$ = new State([])
  page$ = new State([])
  loading$ = new State({})
  constructor(private PayApi: PayApi) {}
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
