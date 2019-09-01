import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { CardApi, GetMemberListInput } from '@/api/v1/sold/cards'
import { AuthService } from '@/services/auth.service'
import { UserService } from '@/services/user.service'

@Injectable()
export class MemberService implements RouteGuard {
  list$ = new State({})
  page$ = new State({})
  loading$ = new State({})
  auth$ = this.authService.authMap$({
    export: 'shop:sold:sold_member_card|export',
    gift: 'shop:sold:sold_member_card|gift',
    vipRegion: 'shop:sold:sold_member_card|vip_region'
  })
  cardTypes$ = this.userService.getOptions$('sold.card_type').pipe(
    tap(list => {
      list.unshift({ value: -1, label: '全部' })
    })
  )
  cardStatus$ = this.userService.getOptions$('sold.card_status').pipe(
    tap(list => {
      list.unshift({ value: -1, label: '全部' })
    })
  )
  isOpens$ = this.userService.getOptions$('sold.is_open').pipe(
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
    return this.cardApi.getMemberList(params, 'member').pipe(
      tap((res: any) => {
        res = this.authService.filter(res)
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  @Effect()
  unFreeze(id: string) {
    return this.cardApi.unFreezeCard(id, 'member')
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getList(to.meta.query)
  }
}
