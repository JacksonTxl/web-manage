import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { Effect, State, computed } from 'rx-state'
import { CardsApi, CardsInput } from '@/api/v1/cards'
import { tap } from 'rxjs/operators'
import { UserService } from '@/services/user.service'
import { forkJoin } from 'rxjs'
@Injectable()
export class EditService implements Controller {
  cardInfo$ = new State({})
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
  isShelfCard$ = computed<boolean>(
    (card: any) => {
      console.log(card)
      if (!card.shelf_shop_num) return false
      return card.shelf_shop_num > 0
    },
    [this.cardInfo$]
  )
  constructor(private cardsApi: CardsApi, private userService: UserService) {}
  getCardInfo(id: string) {
    return this.cardsApi.getCardInfoBack(id, 'shop').pipe(
      tap((res: any) => {
        this.cardInfo$.commit(() => res.info)
      })
    )
  }
  @Effect()
  editCard(data: CardsInput) {
    return this.cardsApi.editCard(data, 'shop')
  }
  init(id: string) {
    return forkJoin([this.getCardInfo(id)])
  }
  beforeRouteEnter(to: ServiceRoute) {
    if (to.meta.query.type === 1) {
      this.cardBgList$ = this.userService.getOptions$(
        'member_card.family_card_bg_list'
      )
    }
    return this.init(to.meta.query.id)
  }
}
