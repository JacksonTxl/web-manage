import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck } from 'rxjs/operators'
import { Store } from '@/services/store'
import { MemberAPi } from '@/api/v1/member'

interface CardsTableModelState {
  lableInfo: any
}
@Injectable()
export class FrozenService extends Store<CardsTableModelState> {
  state$: State<CardsTableModelState>
  cardsListInfo$: Computed<string>
  constructor(private MemberAPi: MemberAPi) {
    super()
    this.state$ = new State({
      cardsListInfo: {}
    })
    this.cardsListInfo$ = new Computed(this.state$.pipe(pluck('cardsListInfo')))
  }

  getMemberBuy(data: any) {
    return this.MemberAPi.getMemberFreeze(data)
  }
  getMemberTransfer(data: any) {
    return this.MemberAPi.getAddMemberFreeze(data)
  }
}
