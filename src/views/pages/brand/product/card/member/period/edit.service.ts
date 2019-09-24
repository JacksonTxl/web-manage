import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { Effect, State, computed } from 'rx-state'
import { CardsApi, CardsInput } from '@/api/v1/cards'
import { ShopApi, GetShopBasicInput } from '@/api/v1/shop'
import { tap, pluck } from 'rxjs/operators'
import { UserService } from '@/services/user.service'
import { forkJoin } from 'rxjs'
@Injectable()
export class EditService implements RouteGuard {
  cardInfo$ = new State({})
  loading$ = new State({})
  cardBgList$ = this.userService.getOptions$('member_card.card_bg_list')
  admissionRange$ = this.userService.getOptions$('member_card.admission_range')
  priceSetting$ = this.userService.getOptions$('member_card.price_setting')
  supportSales$ = this.userService.getOptions$('member_card.support_sales')
  unit$ = this.userService.getOptions$('member_card.unit')
  sellType$ = this.userService.getOptions$('member_card.sell_type')
  // 是否上架的卡
  isShelfCard$ = computed<boolean>(
    (card: any) => {
      if (!card.shelf_shop_num) return false
      return card.shelf_shop_num > 0
    },
    [this.cardInfo$]
  )
  constructor(
    private cardsApi: CardsApi,
    private shopApi: ShopApi,
    private userService: UserService
  ) {}
  getCardInfo(id: string) {
    return this.cardsApi.getCardInfoBack(id, 'brand').pipe(
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
    return this.cardsApi.editCard(data, 'brand')
  }
  init(id: string) {
    return forkJoin([this.getCardInfo(id)])
  }
  beforeRouteEnter(to: ServiceRoute) {
    return this.init(to.meta.query.id)
  }
}
