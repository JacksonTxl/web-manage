import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { CardsApi, CardsInput } from '@/api/v1/cards'
import { ShopApi, GetShopBasicInput } from '@/api/v1/shop'
import { pluck } from 'rxjs/operators'

@Injectable()
export class AddService {
  loading$ = new State({})
  constructor(private cardsApi: CardsApi, private shopApi: ShopApi) {}
  @Effect()
  addCard(data: CardsInput) {
    return this.cardsApi.addCardsDeposit(data, 'brand')
  }
  getShopBasic(params: GetShopBasicInput) {
    return this.shopApi.getShopBasic(params).pipe(
      pluck('shops')
    )
  }
}
