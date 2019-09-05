import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { CardApi, GetMemberListInput } from '@/api/v1/sold/cards'
import { AuthService } from '@/services/auth.service'
import { UserService } from '@/services/user.service'

@Injectable()
export class DepositService implements RouteGuard {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  auth$ = this.authService.authMap$({
    export: 'shop:sold:sold_deposit_card|export'
  })
  isValids$ = this.userService.getOptions$('sold.is_valid').pipe(
    tap(list => {
      list.unshift({ value: -1, label: '全部' })
    })
  )
  constructor(
    private cardApi: CardApi,
    private authService: AuthService,
    private userService: UserService
  ) {}
  @Effect()
  getList(params: GetMemberListInput) {
    return this.cardApi.getMemberList(params, 'deposit').pipe(
      tap((res: any) => {
        res = this.authService.filter(res)
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getList(to.meta.query)
  }
}
