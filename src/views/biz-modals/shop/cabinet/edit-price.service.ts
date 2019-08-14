import { UserService } from './../../../../services/user.service'
import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state/src'
import { CabinetPriceApi, UpdateInput } from '@/api/v1/setting/cabinet/price'

@Injectable()
export class EditPriceService {
  loading$ = new State({})
  transferUnits$ = this.userService.getOptions$('setting.cabinet.transfer_unit')
  constructor(
    private cabinetPriceApi: CabinetPriceApi,
    private userService: UserService
  ) {}
  @Effect()
  updatePrice(params: UpdateInput) {
    return this.cabinetPriceApi.update(params)
  }
}
