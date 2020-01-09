import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { AppApi, UpdateInput, QUERY } from '@/api/v1/setting/app'
import { UserService } from '@/services/user.service'

@Injectable()
export class BasicSettingService {
  loading$ = new State({})
  reserveStarts$ = this.userService.getOptions$(
    'venues_reserve.venues_reserve_start'
  )
  reserveRanges$ = this.userService.getOptions$('setting.reserve_range')
  cancelReserves$ = this.userService.getOptions$(
    'venues_reserve.venues_cancel_limit'
  )
  signTimes$ = this.userService.getOptions$('setting.sign_time')
  autoSignLimits$ = this.userService.getOptions$('setting.auto_sign_limit')
  constructor(private appApi: AppApi, private userService: UserService) {}
  getInfo(query: QUERY) {
    return this.appApi.getInfo(query)
  }
  @Effect()
  update(params: UpdateInput) {
    return this.appApi.update(params)
  }
}
