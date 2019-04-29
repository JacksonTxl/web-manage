import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck } from 'rxjs/operators'
import { Store } from '@/services/store'
import { CardsApi } from '@/api/v1/cards'

interface CardsListInfoState {
  cardsListInfo: any
}
@Injectable()
export class MemberListService extends Store<CardsListInfoState> {
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
  @Effect()
  getListInfo(paramsObj: any) {
    return this.cardsApi.getCardsBrandDeposit(paramsObj)
  }
  // 会员
  getCardsSaleStopReason(id: string) {
    return this.cardsApi.getCardsSaleStopReason(id)
  }
  // 储值卡
  getCardsBrandDepositStop(id: string) {
    return this.cardsApi.getCardsBrandDepositStop(id)
  }
  setCardsDepositBrandOnLine(paramsObj: any) {
    return this.cardsApi.setCardsDepositBrandOnLine(paramsObj)
  }
  beforeRouteUpdate(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getListInfo(to.query).subscribe(res => {
      this.SET_CARDS_LIST_INFO(res)
      next()
    })
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getListInfo(to.query ? to.query : { size: 10, page: 1 }).subscribe(
      res => {
        console.log(res, '获取数据')
        this.SET_CARDS_LIST_INFO(res)
        next()
      }
    )
  }
}
