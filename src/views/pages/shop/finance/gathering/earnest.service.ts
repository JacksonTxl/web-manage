import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { map, tap } from 'rxjs/operators'
import { GatheringApi, EarnestParams } from '@/api/v1/finance/gathering'
import { AuthService } from '@/services/auth.service'
import { UserService } from '@/services/user.service'

@Injectable()
export class EarnestService implements RouteGuard {
  list$ = new State({})
  page$ = new State({})
  loading$ = new State({})
  auth$ = this.authService.authMap$({
    add: 'shop:product:product|order'
  })
  useStatus$ = this.userService.getOptions$('advance_fee.use_status').pipe(
    map(list => {
      list.unshift()
      return [{ value: -1, label: '全部' }].concat(list)
    })
  )
  constructor(
    private gatheringApi: GatheringApi,
    private authService: AuthService,
    private userService: UserService
  ) {}
  @Effect()
  getList(params: EarnestParams) {
    return this.gatheringApi.getEarnestList(params).pipe(
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
