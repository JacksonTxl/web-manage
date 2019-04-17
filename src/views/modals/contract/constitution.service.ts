import {
  ContractApi,
  ContractConstitutionInput
} from '@/api/v1/setting/contract'
import { Injectable } from 'vue-service-app'
import { Effect, State, Computed, log } from 'rx-state'
import { Store } from '@/services/store'

@Injectable()
export class ConstitutionService extends Store<{}> {
  state$ = new State({})
  constructor(private contractApi: ContractApi) {
    super()
  }
  @Effect()
  updateConstitution(data: ContractConstitutionInput) {
    return this.contractApi.updateConstitution(data)
  }
}
