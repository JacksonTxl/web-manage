import { UserService } from '../../../../services/user.service'
import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state/src'
import { CabinetApi } from '@/api/v1/setting/cabinet'

@Injectable()
export class EditStatusService {
  loading$ = new State({})
  cabinetBusinessTypes$ = this.userService.getOptions$(
    'cabinet.cabinet_business_type'
  )
  constructor(
    private cabinetApi: CabinetApi,
    private userService: UserService
  ) {}
  @Effect()
  editCabinetStatus(id: number, params: any) {
    return this.cabinetApi.editCabinetStatus(id, params)
  }
}
