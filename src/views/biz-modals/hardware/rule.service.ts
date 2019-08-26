import { Injectable } from 'vue-service-app'
import { State } from 'rx-state/src'
import { UserService } from '@/services/user.service'
import { HareWareApi, PostGlobalSettingParams } from '@/api/v1/setting/hardware'
import { tap } from 'rxjs/operators'
@Injectable()
export class RuleService {
  loading$ = new State({})
  rule$ = this.userService.getOptions$('setting.entrance.times_card_rules')

  constructor(
    private HareWareApi: HareWareApi,
    private userService: UserService
  ) {}

  postGlobalSetting(params: PostGlobalSettingParams) {
    return this.HareWareApi.postGlobalSetting(params)
  }
}
