import {
  SignUpApi,
  GetSignUpSignList
} from './../../../../../../api/v1/marketing/sign-up'
import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap, pluck } from 'rxjs/operators'

@Injectable()
export class CheckinService implements RouteGuard {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})

  constructor(private signUpApi: SignUpApi) {}
  @Effect()
  getList(params: GetSignUpSignList) {
    return this.signUpApi.getSignUpSignList(params).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  beforeEach(to: ServiceRoute) {
    return this.getList(to.meta.query)
  }
}
