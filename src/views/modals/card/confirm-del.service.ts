import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck } from 'rxjs/operators'
import { Store } from '@/services/store'
import { CardsApi } from '@/api/v1/cards'

interface CardsTableModelState {
  cardsTableModel: any
}
@Injectable()
export class ConfimDelService extends Store<CardsTableModelState> {
  state$: State<CardsTableModelState>
  cardsTableModel$: Computed<string>
  constructor(private cardsApi: CardsApi) {
    super()
    this.state$ = new State({
      cardsTableModel: {}
    })
    this.cardsTableModel$ = new Computed(
      this.state$.pipe(pluck('cardsTableModel'))
    )
  }
  SET_CARDS_Table_INFO(cardsTableModel: CardsTableModelState) {
    this.state$.commit(state => {
      state.cardsTableModel = cardsTableModel
    })
  }
  getListInfo(paramsObj: string) {
    // return this.cardsApi.getCardsDel(paramsObj)
  }
  getCardsDeposit(paramsObj: string) {
    return this.cardsApi.getCardsDeposit(paramsObj)
  }
}
