import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { CardApi, GetMemberListInput } from '@/api/v1/sold/cards'
import { AuthService } from '@/services/auth.service'
import { UserService } from '@/services/user.service'
import { TitleService } from '@/services/title.service'
@Injectable()
export class MemberService implements Controller {
  list$ = new State({})
  page$ = new State({})
  loading$ = new State({})
  total$ = new State({})

  auth$ = this.authService.authMap$({
    export: 'shop:sold:sold_member_card|export',
    gift: 'shop:sold:sold_member_card|gift',
    batch_admission: 'shop:sold:sold_member_card|batch_admission',
    vipRegion: 'shop:sold:sold_member_card|vip_region',
    extendDay: 'shop:sold:sold_member_card|batch_extend_valid'
  })
  cardTypes$ = this.userService.getOptions$('sold_common.card_type', {
    addAll: true
  })
  cardStatus$ = this.userService.getOptions$('sold_common.card_status', {
    addAll: true
  })
  isOpens$ = this.userService.getOptions$('sold_common.is_open', {
    addAll: true
  })
  constructor(
    private cardApi: CardApi,
    private authService: AuthService,
    private userService: UserService,
    private titleService: TitleService
  ) {}
  @Effect()
  getList(params: GetMemberListInput) {
    return this.cardApi.getMemberList(params, 'member').pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
        this.total$.commit(() => res.total)
      })
    )
  }
  @Effect()
  unFreeze(id: string) {
    return this.cardApi.unFreezeCard(id, 'member')
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    this.titleService.SET_TITLE(this.userService.c('member_card'))
    return this.getList(to.meta.query)
  }
}
