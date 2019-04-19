import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { Effect, State, Computed } from 'rx-state'
import { CardsApi, CardsInput } from '@/api/v1/cards'
import { Store } from '@/services/store'
import { pluck, tap } from 'rxjs/operators'

interface CardState {
  cardInfo: any
}
@Injectable()
export class EditService extends Store<CardState> implements RouteGuard {
  state$: State<CardState>
  cardInfo$: Computed<any>
  constructor(private cardsApi: CardsApi) {
    super()
    this.state$ = new State({
      cardInfo: {}
    })
    this.cardInfo$ = new Computed(this.state$.pipe(pluck('cardInfo')))
  }
  getCardInfo(id:string) {
    return this.cardsApi.getCardInfoBack(id).pipe(tap((res:any) => {
      this.SET_CARD_INFO(res.info)
    }))
  }
  SET_CARD_INFO(info:any) {
    this.state$.commit(state => {
      state.cardInfo = info
    })
  }
  @Effect()
  editCard(data: CardsInput) {
    return this.cardsApi.editCards(data)
  }
  beforeRouteEnter(to:ServiceRoute, from:ServiceRoute, next:()=>{}) {
    this.getCardInfo(to.meta.query.id).subscribe(() => {
      next()
    })
  }
}
