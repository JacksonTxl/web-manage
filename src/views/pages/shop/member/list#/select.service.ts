import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck } from 'rxjs/operators'
import { Store } from '@/services/store'
import { MemberApi } from '@/api/v1/member'

interface SelectInfoState {}
@Injectable()
export class SelectService extends Store<SelectInfoState> {
  state$: State<SelectInfoState>

  constructor(private cardsApi: MemberApi) {
    super()
    this.state$ = new State({})
  }

  getMemberSourceRegisters() {
    return this.cardsApi.getMemberSourceRegisters()
  }
}
