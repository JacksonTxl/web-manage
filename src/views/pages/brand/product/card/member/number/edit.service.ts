import { Injectable } from 'vue-service-app'
import { Effect } from 'rx-state'
import { CardsApi, CardsInput } from '@/api/v1/cards'
import { Store } from '@/services/store'

@Injectable()
export class EditService extends Store<any> {
  constructor(private cardsApi: CardsApi) {
    super()
  }
  @Effect()
  addCard(data: CardsInput) {
    return this.cardsApi.addCards(data)
  }
}
