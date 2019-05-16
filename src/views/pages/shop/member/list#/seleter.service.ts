import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck } from 'rxjs/operators'
import { Store } from '@/services/store'
import { MemberAPi } from '@/api/v1/member'

interface CardsListInfoState {}
@Injectable()
export class SeleterService extends Store<CardsListInfoState> {
  state$: State<CardsListInfoState>

  constructor(private cardsApi: MemberAPi) {
    super()
    this.state$ = new State({})
  }

  getMemberSourceRegisters() {
    return this.cardsApi.getMemberSourceRegisters()
  }
}
