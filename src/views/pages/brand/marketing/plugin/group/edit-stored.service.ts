import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
// import { AuthService } from '@/services/auth.service'
import { GroupBuyApi } from '@/api/v1/marketing/group_buy'
import { tap } from 'rxjs/operators'
import { anyAll } from '@/operators'

@Injectable()
export class EditStoredService implements Controller {
  info$ = new State({})
  list$ = new State({})
  constructor(private groupBuyApi: GroupBuyApi) {}
  @Effect()
  getStoredData(id: number) {
    return this.groupBuyApi.getStoredData(id).pipe(
      tap((res: any) => {
        this.info$.commit(() => res)
      })
    )
  }
  getDepositList() {
    return this.groupBuyApi.getDepositList().pipe(
      tap((res: any) => {
        this.list$.commit(() => res)
      })
    )
  }
  init() {
    return anyAll(this.getStoredData(1), this.getDepositList())
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    return this.init()
  }
}
