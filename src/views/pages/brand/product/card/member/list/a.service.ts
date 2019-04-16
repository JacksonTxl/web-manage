import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck } from 'rxjs/operators'
import { Store } from '@/services/store'
import { CardsApi } from '@/api/v1/cards'

interface CardsListInfoState {
  cardsListInfo: any
}
@Injectable()
export class AService extends Store<CardsListInfoState> {
  state$: State<CardsListInfoState>
  cardsListInfo$: Computed<string>
  constructor(private cardsApi: CardsApi) {
    super()
    this.state$ = new State({
      cardsListInfo: {}
    })
    this.cardsListInfo$ = new Computed(this.state$.pipe(pluck('cardsListInfo')))
  }
  SET_CARDS_LIST_INFO(cardsListInfo: CardsListInfoState) {
    this.state$.commit(state => {
      state.cardsListInfo = cardsListInfo
    })
  }
  getListInfo(paramsObj: any) {
    return this.cardsApi.getCardsBgList()
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    console.log('cards')
    this.getListInfo({ name: 1, age: 10 }).subscribe(res => {
      this.SET_CARDS_LIST_INFO(res)
    })
    next()
  }
}