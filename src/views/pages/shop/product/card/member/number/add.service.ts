import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { CardsApi, CardsInput } from '@/api/v1/cards'
import { UserService } from '@/services/user.service'
@Injectable()
export class AddService {
  loading$ = new State({})
  cardBgList$ = this.userService.getOptions$('member_card.card_bg_list')
  admissionRange$ = this.userService.getOptions$('member_card.admission_range')
  priceSetting$ = this.userService.getOptions$('member_card.price_setting')
  supportSales$ = this.userService.getOptions$('member_card.support_sales')
  unit$ = this.userService.getOptions$('member_card.unit')
  sellType$ = this.userService.getOptions$('member_card.sell_type')
  constructor(private cardsApi: CardsApi, private userService: UserService) {}
  @Effect()
  addCard(data: CardsInput) {
    return this.cardsApi.addCard(data, 'shop')
  }
}
