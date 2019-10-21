import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import {
  MarketingApi,
  AddMarketingCouponParams,
  EditMarketingCouponParams
} from '@/api/v1/marketing/marketing'
import { tap, pluck } from 'rxjs/operators'
import { SignUpApi, SignUpInfo } from '@/api/v1/marketing/sign-up'

@Injectable()
export class CopyService implements RouteGuard {
  loading$ = new State({})
  defaultForm$ = new State({})

  constructor(private api: SignUpApi) {}
  getDefaultForm(id: number) {
    return this.api.getSignUpEditInfo(id).pipe(
      tap(res => {
        this.defaultForm$.commit(() => res.info)
      })
    )
  }

  beforeRouteEnter(to: ServiceRoute) {
    return this.getDefaultForm(to.meta.query.id)
  }
}
