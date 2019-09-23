import { UserService } from '../../../../services/user.service'
import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state/src'
import { CabinetApi } from '@/api/v1/setting/cabinet'

@Injectable()
export class OpenService {
  loading$ = new State({})
  unlockReasons$ = this.userService.getOptions$('cabinet.unlock_reason')
  constructor(
    private cabinetApi: CabinetApi,
    private userService: UserService
  ) {}
  @Effect()
  openCabinet(id: number, params: any) {
    return this.cabinetApi.openCabinet(id, params)
  }
}
