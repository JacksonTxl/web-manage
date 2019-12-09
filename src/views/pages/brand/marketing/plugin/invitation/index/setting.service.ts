import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { MarketingApi, SetInviteEditInput } from '@/api/v1/marketing/marketing'
import { tap } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class SettingService implements Controller {
  loading$ = new State({})
  settingInfo$ = new State({})
  auth$ = this.authService.authMap$({
    add: 'brand:activity:invite|add',
    edit: 'brand:activity:invite|edit'
  })
  constructor(
    private marketingApi: MarketingApi,
    private authService: AuthService
  ) {}
  getInviteEditInfo(from: any) {
    return this.marketingApi.getInviteEditInfo().pipe(
      tap((res: any) => {
        if (from.from === 'data') {
          res.info.activity_status = 1
        }
        this.settingInfo$.commit(() => res.info)
      })
    )
  }
  @Effect()
  add(params: SetInviteEditInput) {
    return this.marketingApi.setInviteAdd(params)
  }
  @Effect()
  edit(params: SetInviteEditInput) {
    return this.marketingApi.setInviteEdit(params)
  }
  beforeEach(to: ServiceRoute) {
    return this.getInviteEditInfo(to.params)
  }
}
