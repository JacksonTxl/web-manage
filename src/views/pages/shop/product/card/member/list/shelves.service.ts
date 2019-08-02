import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { CardsApi, CardShelfListInput } from '@/api/v1/cards'
import { tap, map } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'
import { UserService } from '@/services/user.service'

@Injectable()
export class ShelvesService implements RouteGuard {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  publishChannel$ = this.userService
    .getOptions$('member_card.publish_channel')
    .pipe(map(options => [{ value: -1, label: '所有渠道' }].concat(options)))
  cardType$ = this.userService
    .getOptions$('member_card.card_type')
    .pipe(map(options => [{ value: -1, label: '所有类型' }].concat(options)))

  constructor(
    private userService: UserService,
    private cardApi: CardsApi,
    private authService: AuthService
  ) {}
  @Effect()
  getList(query: CardShelfListInput) {
    return this.cardApi.getCardShelfList(query, 'shop', 'member').pipe(
      tap((res: any) => {
        res = this.authService.filter(res)
        this.page$.commit(() => res.page)
        this.list$.commit(() => res.list)
      })
    )
  }
  @Effect()
  setCardShelfDown(id: string) {
    return this.cardApi.setCardsShelfDown(id, 'shop', 'member')
  }
  beforeEach(to: ServiceRoute) {
    return this.getList(to.meta.query)
  }
}
