import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { UserService } from '@/services/user.service'
import {
  TeamReserveSettingApi,
  UpdateInput
} from '@/api/v1/setting/course/team/reserve'

@Injectable()
export class ReserveService {
  loading$ = new State({})

  open_condition_limit_num$ = this.userService.getOptions$(
    'setting.open_condition_limit_num'
  )
  open_condition_limit_time$ = this.userService.getOptions$(
    'setting.open_condition_limit_time'
  )
  auto_sign_limit$ = this.userService.getOptions$('setting.auto_sign_limit')
  sign_time$ = this.userService.getOptions$('setting.sign_time')
  limit_num$ = this.userService.getOptions$('setting.limit_num')
  cancel_reserve$ = this.userService.getOptions$('setting.cancel_reserve')
  reserve_range$ = this.userService.getOptions$('setting.reserve_range')
  reserve_start$ = this.userService.getOptions$('setting.reserve_start')
  constructor(
    protected reserveSettingApi: TeamReserveSettingApi,
    private userService: UserService
  ) {}

  getInfo() {
    return this.reserveSettingApi.getInfo()
  }
  @Effect()
  update(params: UpdateInput) {
    return this.reserveSettingApi.update(params)
  }
}
