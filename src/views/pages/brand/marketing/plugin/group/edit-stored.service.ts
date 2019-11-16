import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
// import { AuthService } from '@/services/auth.service'
import { GroupBuyApi } from '@/api/v1/marketing/group_buy'
import { tap } from 'rxjs/operators'
import { anyAll } from '@/operators'

@Injectable()
export class EditStoredService implements Controller {
  info$ = new State({})
  constructor(private groupBuyApi: GroupBuyApi) {}
  @Effect()
  getStoredData(id: number) {
    return this.groupBuyApi.getStoredData(id).pipe(
      tap((res: any) => {
        this.info$.commit(() => res)
      })
    )
  }
  init() {
    return anyAll(this.getStoredData(1))
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    return this.init()
  }
}
