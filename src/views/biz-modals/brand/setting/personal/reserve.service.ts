import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import {
  PersonReserveSettingApi,
  UpdateInput
} from '@/api/v1/setting/course/personal/reserve'
import { UserService } from '@/services/user.service'

@Injectable()
export class PersonalReserveSettingService {
  loading$ = new State({})
  reserveStarts$ = this.userService.getOptions$('setting.reserve_start')
  reserveRanges$ = this.userService.getOptions$('setting.reserve_range')
  cancelReserves$ = this.userService.getOptions$('setting.cancel_reserve')
  signTimes$ = this.userService.getOptions$('setting.sign_time')
  autoSignLimits$ = this.userService.getOptions$('setting.auto_sign_limit')
  constructor(
    private reserveSettingApi: PersonReserveSettingApi,
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
