import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { CardsApi, CardListInput } from '@/api/v1/cards'
import { AuthService } from '@/services/auth.service'
import { tap, map } from 'rxjs/operators'
import { UserService } from '@/services/user.service'

@Injectable()
export class AllService implements RouteGuard {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  auth$ = this.authService.authMap$({
    add: 'brand_shop:product:member_card|add'
  })
  publishChannel$ = this.userService
    .getOptions$('member_card.publish_channel')
    .pipe(map(options => [{ value: -1, label: '所有渠道' }].concat(options)))
  cardType$ = this.userService
    .getOptions$('member_card.card_type')
    .pipe(map(options => [{ value: -1, label: '所有类型' }].concat(options)))
  sellStatus$ = this.userService
    .getOptions$('member_card.sell_status')
    .pipe(
      map(options => [{ value: -1, label: '所有售卖状态' }].concat(options))
    )

  constructor(
    private cardsApi: CardsApi,
    private userService: UserService,
    private authService: AuthService
  ) {}
  @Effect()
  getList(query: CardListInput) {
    return this.cardsApi.getCardList(query, 'brand', 'member').pipe(
      tap((res: any) => {
        res = this.authService.filter(res)
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  @Effect()
  deleteCard(id: string) {
    return this.cardsApi.setCardsDelete(id, 'brand', 'member')
  }
  beforeEach(to: ServiceRoute) {
    return this.getList(to.meta.query)
  }
}
