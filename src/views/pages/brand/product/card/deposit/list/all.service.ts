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
  auth$ = this.authService.authMap({
    add: 'brand_shop:product:deposit_card|add'
  })
  publishChannel$ = this.userService
    .getOptions('deposit_card.publish_channel')
    .pipe(map(options => [{ value: -1, label: '所有渠道' }].concat(options)))
  sellStatus$ = this.userService
    .getOptions('deposit_card.sell_status')
    .pipe(map(options => [{ value: -1, label: '所有售卖状态' }].concat(options)))

  constructor(
    private cardsApi: CardsApi,
    private userService: UserService,
    private authService: AuthService) {}
  @Effect()
  getList(query:CardListInput) {
    return this.cardsApi.getCardList(query, 'brand', 'deposit').pipe(tap((res:any) => {
      res = this.authService.filter(res)
      this.list$.commit(() => res.list)
      this.page$.commit(() => res.page)
    }))
  }
  setShelf(id:string) {
    return this.cardsApi.setCardsDepositShelf(id, 'brand')
  }
  deleteCard(id:string) {
    return this.cardsApi.setCardsDelete(id, 'brand', 'deposit')
  }
  beforeEach(to:ServiceRoute) {
    return this.getList(to.meta.query)
  }
}
