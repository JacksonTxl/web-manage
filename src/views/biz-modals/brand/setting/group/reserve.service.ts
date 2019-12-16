import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { GroupReserveSettingApi } from '@/api/v1/setting/course/group/reserve'
import { UserService } from '@/services/user.service'

@Injectable()
export class GroupReserveSettingService {
  loading$ = new State({})
  reserveStarts$ = this.userService.getOptions$('setting.reserve_start')
  reserveRanges$ = this.userService.getOptions$('setting.reserve_range')
  cancelReserves$ = this.userService.getOptions$('setting.cancel_reserve')
  signTimes$ = this.userService.getOptions$('setting.sign_time')
  autoSignLimits$ = this.userService.getOptions$('setting.auto_sign_limit')
  constructor(
    private reserveSettingApi: GroupReserveSettingApi,
    private userService: UserService
  ) {}
  getInfo() {
    return this.reserveSettingApi.getInfo()
  }
  @Effect()
  editInfo(params: any) {
    return this.reserveSettingApi.editInfo(params)
  }
}
