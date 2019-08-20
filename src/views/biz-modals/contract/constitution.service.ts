import {
  ContractApi,
  ContractConstitutionInput
} from '@/api/v1/setting/contract'
import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'

@Injectable()
export class ConstitutionService {
  loading$ = new State({})
  constructor(private contractApi: ContractApi) {}
  @Effect()
  updateConstitution(data: ContractConstitutionInput) {
    return this.contractApi.updateConstitution(data)
  }
}
