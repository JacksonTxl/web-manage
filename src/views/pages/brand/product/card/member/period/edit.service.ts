import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { CardsApi, CardsInput } from '@/api/v1/cards'
import { ShopApi, GetShopBasicInput } from '@/api/v1/shop'
import { tap, pluck } from 'rxjs/operators'

@Injectable()
export class EditService implements RouteGuard {
  cardInfo$ = new State({})
  loading$ = new State({})
  constructor(private cardsApi: CardsApi, private shopApi: ShopApi) {}
  getCardInfo(id:string) {
    return this.cardsApi.getCardInfoBack(id, 'brand').pipe(tap((res:any) => {
      this.cardInfo$.commit(() => res.info)
    }))
  }
  getShopBasic(params: GetShopBasicInput) {
    return this.shopApi.getShopBasic(params).pipe(
      pluck('shops')
    )
  }
  @Effect()
  editCard(data: CardsInput) {
    return this.cardsApi.editCard(data, 'brand')
  }
  beforeRouteEnter(to:ServiceRoute, from:ServiceRoute, next:()=>{}) {
    this.getCardInfo(to.meta.query.id).subscribe(() => {
      next()
    })
  }
}
