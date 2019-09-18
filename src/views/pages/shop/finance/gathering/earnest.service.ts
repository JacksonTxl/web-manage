import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { GatheringApi, EarnestParams } from '@/api/v1/finance/gathering'
import { AuthService } from '@/services/auth.service'
import { UserService } from '@/services/user.service'

@Injectable()
export class EarnestService implements RouteGuard {
  list$ = new State({})
  page$ = new State({})
  loading$ = new State({})
  auth$ = this.authService.authMap$({
    export: 'shop:sold:sold_member_card|export',
    gift: 'shop:sold:sold_member_card|gift',
    vipRegion: 'shop:sold:sold_member_card|vip_region'
  })
  useStatus$ = this.userService.getOptions$('advance_fee.use_status').pipe(
    tap(list => {
      list.unshift({ value: -1, label: '全部' })
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
  // @Effect()
  // unFreeze(id: string) {
  //   return this.cardApi.unFreezeCard(id, 'member')
  // }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getList(to.meta.query)
  }
}
