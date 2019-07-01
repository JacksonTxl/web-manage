import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { MarketingApi, SetInviteEditInput } from '@/api/v1/marketing/marketing'
import { tap } from 'rxjs/operators'

@Injectable()
export class SettingService implements RouteGuard {
  loading$ = new State({})
  settingInfo$ = new State({})
  constructor(private marketingApi: MarketingApi) {}
  getInviteEditInfo(from:any) {
    return this.marketingApi.getInviteEditInfo().pipe(tap((res:any) => {
      if (from.from === 'data') {
        res.info.activity_status = 1
      }
      this.settingInfo$.commit(() => res.info)
    }))
  }
  @Effect()
  edit(params:SetInviteEditInput) {
    return this.marketingApi.setInviteEdit(params)
  }
  beforeEach(to:ServiceRoute, from:ServiceRoute, next:()=>{}) {
    this.getInviteEditInfo(to.params).subscribe(() => {
      next()
    })
  }
}