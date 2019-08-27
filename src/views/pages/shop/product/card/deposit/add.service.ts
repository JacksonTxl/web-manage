import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { CardsApi, CardsInput } from '@/api/v1/cards'
import { UserService } from '@/services/user.service'
@Injectable()
export class AddService {
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
  constructor(private cardsApi: CardsApi, private userService: UserService) {}
  @Effect()
  addCard(data: CardsInput) {
    return this.cardsApi.addCardsDeposit(data, 'shop')
  }
}
