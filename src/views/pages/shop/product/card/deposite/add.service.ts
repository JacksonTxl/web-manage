import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { CardsApi, CardsInput } from '@/api/v1/cards'

@Injectable()
export class AddService {
  loading$ = new State({})
  constructor(private cardsApi: CardsApi) {}
  @Effect()
  addCard(data: CardsInput) {
    return this.cardsApi.addCardsDeposit(data, 'shop')
  }
}
