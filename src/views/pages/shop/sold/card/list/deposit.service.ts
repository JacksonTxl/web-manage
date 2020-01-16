import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { CardApi, GetMemberListInput } from '@/api/v1/sold/cards'
import { AuthService } from '@/services/auth.service'
import { UserService } from '@/services/user.service'

@Injectable()
export class DepositService implements Controller {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  total$ = new State({})
  auth$ = this.authService.authMap$({
    export: 'shop:sold:sold_deposit_card|export'
  })
  isValids$ = this.userService.getOptions$('sold_common.is_valid', {
    addAll: true
  })
  constructor(
    private cardApi: CardApi,
    private authService: AuthService,
    private userService: UserService
  ) {}
  @Effect()
  getList(params: GetMemberListInput) {
    return this.cardApi.getMemberList(params, 'deposit').pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
        this.total$.commit(() => res.total)
      })
    )
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getList(to.meta.query)
  }
}
