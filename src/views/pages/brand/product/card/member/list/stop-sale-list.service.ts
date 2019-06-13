import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { CardsApi } from '@/api/v1/cards'
import { AuthService } from '@/services/auth.service'

interface CardsListInfoState {
  cardsListInfo: any
}
@Injectable()
export class StopSaleListService extends Store<CardsListInfoState> {
  state$: State<CardsListInfoState>
  cardsListInfo$: Computed<string>
  auth$: Computed<object>
  constructor(
    private cardsApi: CardsApi,
    private authService: AuthService
  ) {
    super()
    this.state$ = new State({
      cardsListInfo: {},
      auth: {
        batchDown: this.authService.can('brand_shop:product:member_card|batch_down')
      }
    })
    this.cardsListInfo$ = new Computed(this.state$.pipe(pluck('cardsListInfo')))
    this.auth$ = new Computed(this.state$.pipe(pluck('auth')))
  }
  SET_CARDS_LIST_INFO(cardsListInfo: CardsListInfoState) {
    this.state$.commit(state => {
      state.cardsListInfo = cardsListInfo
    })
  }
  getListInfo(paramsObj: any) {
    return this.cardsApi.getCardsListA(paramsObj).pipe(
      tap(res => {
        res = this.authService.filter(res)
      })
    )
  }
  beforeRouteUpdate(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getListInfo({ card_name: to.query.cardName }).subscribe(res => {
      this.SET_CARDS_LIST_INFO(res)
      next()
    })
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getListInfo({}).subscribe(res => {
      this.SET_CARDS_LIST_INFO(res)
      next()
    })
  }
}
