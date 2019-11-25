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
export class AddDepositService {
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
  // 新增拼团活动
  @Effect()
  addGroup(params: AddParams) {
    return this.groupBuyApi.addGroup(params)
  }
  @Effect()
  init() {
    return anyAll(this.getDepositList())
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    return this.init()
  }
}
