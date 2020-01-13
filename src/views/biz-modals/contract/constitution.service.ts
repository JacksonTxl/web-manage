import {
  ContractApi,
  ContractConstitutionInput
} from '@/api/v1/setting/contract'
import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { UserService } from '@/services/user.service'

@Injectable()
export class ConstitutionService {
  loading$ = new State({})
  constructor(
    private contractApi: ContractApi,
    private userService: UserService
  ) {}
  productType$ = this.userService.getOptions$('transaction.product_type')
  @Effect()
  updateConstitution(data: ContractConstitutionInput) {
    return this.contractApi.updateConstitution(data)
  }
}
