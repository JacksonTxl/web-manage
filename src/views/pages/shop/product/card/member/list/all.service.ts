import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { CardsApi, CardListInput } from '@/api/v1/cards'
import { tap, map } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'
import { UserService } from '@/services/user.service'
import { forkJoin } from 'rxjs'
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
  shelfStatus$ = this.userService
    .getOptions$('member_card.shelf_status')
    .pipe(
      map(options => [{ value: -1, label: '所有上架状态' }].concat(options))
    )

  constructor(
    private userService: UserService,
    private cardApi: CardsApi,
    private authService: AuthService
  ) {}

  @Effect()
  getList(query: CardListInput) {
    return this.cardApi.getCardList(query, 'shop', 'member').pipe(
      tap((res: any) => {
        res = this.authService.filter(res)
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  @Effect()
  deleteCard(id: string) {
    return this.cardApi.setCardsDelete(id, 'shop', 'member')
  }
  init(query: CardListInput) {
    return forkJoin([this.getList(query)])
  }
  beforeEach(to: ServiceRoute) {
    return this.init(to.meta.query)
  }
}
