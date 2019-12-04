import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { CardsApi, CardsInput } from '@/api/v1/cards'
import { ShopApi, GetShopBasicInput } from '@/api/v1/shop'
import { pluck } from 'rxjs/operators'
import { UserService } from '@/services/user.service'
@Injectable()
export class AddService implements Controller {
  loading$ = new State({})
  cardBgList$ = this.userService.getOptions$('member_card.card_bg_list')
  admissionRange$ = this.userService.getOptions$('member_card.admission_range')
  priceSetting$ = this.userService.getOptions$('member_card.price_setting')
  supportSales$ = this.userService.getOptions$('member_card.support_sales')
  unit$ = this.userService.getOptions$('member_card.unit')
  sellType$ = this.userService.getOptions$('member_card.sell_type')
  supportMemberNums$ = this.userService.getOptions$(
    'member_card.support_member_num'
  )
  constructor(
    private cardsApi: CardsApi,
    private shopApi: ShopApi,
    private userService: UserService
  ) {}
  @Effect()
  addCard(data: CardsInput) {
    return this.cardsApi.addCard(data, 'brand')
  }
  getShopBasic(params: GetShopBasicInput) {
    return this.shopApi.getShopBasic(params).pipe(pluck('shops'))
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    if (to.meta.query.type === 1) {
      this.cardBgList$ = this.userService.getOptions$(
        'member_card.family_card_bg_list'
      )
    }
    next()
  }
}
