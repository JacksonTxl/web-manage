import {
  SignUpApi,
  GetSignUpSignList
} from './../../../../../../api/v1/marketing/sign-up'
import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { TitleService } from '@/services/title.service'
import { tap, pluck } from 'rxjs/operators'
import { ShopApi, GetShopBasicInput } from '@/api/v1/shop'

@Injectable()
export class CheckinService implements RouteGuard {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})

  constructor(private signUpApi: SignUpApi) {}
  @Effect()
  getList(params: any) {
    return this.signUpApi.getSignUpSignList(params).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  beforeEach(to: ServiceRoute) {
    to.meta.query.id = '23677'
    return this.getList(to.meta.query)
  }
}
