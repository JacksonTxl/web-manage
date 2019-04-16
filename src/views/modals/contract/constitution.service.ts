import {
  ContractApi,
  ContractConstitutionInput
} from '@/api/v1/setting/contract'
import { Injectable } from 'vue-service-app'
import { Effect, State, Computed } from 'rx-state'
import { tap, pluck } from 'rxjs/operators'
import { Store } from '@/services/store'

interface ConState {
  content: string
}
@Injectable()
export class ConstitutionService extends Store<ConState> {
  state$: State<ConState>
  content$: Computed<string>
  constructor(
    private contractApi: ContractApi
  ) {
    super()
    this.state$ = new State({
      content: ''
    })
    this.content$ = new Computed(this.state$.pipe(pluck('content')))
  }
  @Effect()
  getConstitutionInfo(id: number) {
    return this.contractApi.getConstitutionInfo(id).pipe(
      tap(res => {
        this.state$.commit(state => {
          state.content = res.brand_raw_content || ''
        })
      })
    )
  }
  @Effect()
  updateConstitution(data: ContractConstitutionInput) {
    return this.contractApi.updateConstitution(data)
  }
}
