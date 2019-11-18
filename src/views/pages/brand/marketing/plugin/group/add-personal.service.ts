import {
  Injectable,
  Controller,
  RouteGuard,
  ServiceRoute
} from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { GroupBuyApi } from '@/api/v1/marketing/group_buy'
import { anyAll } from '@/operators'
import { tap } from 'rxjs/operators'

@Injectable()
export class AddPersonalService implements Controller {
  loading$ = new State({})
  personalList$ = new State([])
  constructor(private groupBuyApi: GroupBuyApi) {}

  // 新增拼团活动
  @Effect()
  // addGroup(params: AddParams) {
  //   return this.groupBuyApi.addGroup(params)
  // }

  // 编辑拼团活动
  @Effect()
  // editGroup(params: EditParams) {
  //   return this.groupBuyApi.editGroup(params)
  // }
  // 获取私教列表
  @Effect()
  getList() {
    return this.groupBuyApi.getPersonalList().pipe(
      tap((res: any) => {
        this.personalList$.commit(() => res.data.list)
      })
    )
  }
  init() {
    return anyAll(this.getList())
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    return this.init()
  }
}
