import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import {
  AddParams,
  EditParams,
  GroupBuyApi
} from '@/api/v1/marketing/group_buy'
import { AuthService } from '@/services/auth.service'
import { tap } from 'rxjs/operators'
import { anyAll } from '@/operators'

@Injectable()
export class AddStoredService {
  loading$ = new State({})
  list$ = new State({})
  constructor(private groupBuyApi: GroupBuyApi) {}
  @Effect()
  getDepositList() {
    return this.groupBuyApi.getDepositList().pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
      })
    )
  }
  init() {
    return this.getDepositList()
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    return this.init()
  }
}
