import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck } from 'rxjs/operators'
import { Store } from '@/services/store'
import { CardApi } from '@/api/v1/sold/cards'

interface CardsTableModelState {
  lableInfo: any
}
@Injectable()
export class TransferService extends Store<CardsTableModelState> {
  state$: State<CardsTableModelState>
  cardsListInfo$: Computed<string>
  constructor(private cardApi: CardApi) {
    super()
    this.state$ = new State({
      cardsListInfo: {}
    })
    this.cardsListInfo$ = new Computed(this.state$.pipe(pluck('cardsListInfo')))
  }
  getMemberTransferInfo(params: string, type: string) {
    console.log(params, type)
    return this.cardApi.getMemberTransferInfo(params, type)
  }
  settingContractCodenumber(type: string) {
    return this.cardApi.settingContractCodenumber(type)
  }
}
