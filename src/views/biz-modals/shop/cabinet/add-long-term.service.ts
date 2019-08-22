import { Injectable } from 'vue-service-app'
import {
  LongTermCabinetApi,
  AddInput
} from '@/api/v1/setting/cabinet/long-term'
import { Effect, State } from 'rx-state'
import { UserService } from '@/services/user.service'

@Injectable()
export class AddLongTermService {
  loading$ = new State({})
  transferUnits$ = this.userService.getOptions$('setting.cabinet.transfer_unit')
  sortType$ = this.userService.getOptions$('setting.cabinet.sort_type')
  constructor(
    private cabinetApi: LongTermCabinetApi,
    private userService: UserService
  ) {}
  @Effect()
  add(params: AddInput) {
    return this.cabinetApi.add(params)
  }
}
