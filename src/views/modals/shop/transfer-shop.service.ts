import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck } from 'rxjs/operators'
import { Store } from '@/services/store'
import { MemberApi } from '@/api/v1/member'

interface CardsTableModelState {
  lableInfo: any
}
@Injectable()
export class TransferShopService extends Store<CardsTableModelState> {
  state$: State<CardsTableModelState>
  cardsListInfo$: Computed<string>
  constructor(private MemberApi: MemberApi) {
    super()
    this.state$ = new State({
      cardsListInfo: {}
    })
    this.cardsListInfo$ = new Computed(this.state$.pipe(pluck('cardsListInfo')))
  }

  getMemberBuy(data: any) {
    return this.MemberApi.getMemberBuy(data)
  }
  getMemberTransfer(data: any) {
    return this.MemberApi.getMemberTransfer(data)
  }
  getMemberShop() {
    return this.MemberApi.getMemberShop()
  }
  getMemberTransferShop(id: string) {
    return this.MemberApi.getMemberTransferShop(id)
  }
}
