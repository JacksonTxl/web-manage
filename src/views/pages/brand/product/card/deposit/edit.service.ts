import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { CardsApi, CardsInput } from '@/api/v1/cards'
import { tap, pluck } from 'rxjs/operators'
import { ShopApi, GetShopBasicInput } from '@/api/v1/shop'
import { UserService } from '@/services/user.service'

@Injectable()
export class EditService implements RouteGuard {
  cardInfo$ = new State({})
  loading$ = new State({})
  cardBgList$ = this.userService.getOptions$('member_card.card_bg_list')
  unit$ = this.userService.getOptions$('deposit_card.unit')
  consumerType$ = this.userService.getOptions$('deposit_card.consumer_type')
  consumptionRange$ = this.userService.getOptions$(
    'deposit_card.consumption_range'
  )
  transferUnit$ = this.userService.getOptions$('deposit_card.transfer_unit')
  supportSales$ = this.userService.getOptions$('deposit_card.support_sales')
  sellType$ = this.userService.getOptions$('deposit_card.sell_type')

  constructor(
    private cardsApi: CardsApi,
    private shopApi: ShopApi,
    private userService: UserService
  ) {}
  getCardInfo(id: string) {
    return this.cardsApi.getCardDepositInfoBackBrand(id).pipe(
      tap((res: any) => {
        this.cardInfo$.commit(() => res.info)
      })
    )
  }
  getShopBasic(params: GetShopBasicInput) {
    return this.shopApi.getShopBasic(params).pipe(pluck('shops'))
  }
  @Effect()
  editCard(data: CardsInput) {
    return this.cardsApi.editCardDeposit(data, 'brand')
  }
  init(id: string) {
    return this.getCardInfo(id)
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    return this.init(to.meta.query.id)
  }
}
