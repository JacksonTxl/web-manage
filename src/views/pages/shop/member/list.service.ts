import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck } from 'rxjs/operators'
import { Store } from '@/services/store'
import { MemberApi } from '@/api/v1/member'

interface CardsListInfoState {
  cardsListInfo: any
}
@Injectable()
export class ListService extends Store<CardsListInfoState> {
  state$: State<CardsListInfoState>
  cardsListInfo$: Computed<string>
  constructor(private cardsApi: MemberApi) {
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
    return this.cardsApi.getMember(paramsObj)
  }

  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getListInfo({}).subscribe(res => {
      console.log(res, '获取数据')
      this.SET_CARDS_LIST_INFO(res)
      next()
    })
  }
}
