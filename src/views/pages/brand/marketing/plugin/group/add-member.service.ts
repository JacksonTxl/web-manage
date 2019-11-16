import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import {
  AddParams,
  EditParams,
  GroupBuyApi
} from '@/api/v1/marketing/group_buy'

@Injectable()
export class AddMemberService {
  loading$ = new State({})
  constructor(private groupBuyApi: GroupBuyApi) {}

  // 新增拼团活动
  @Effect()
  addGroup(params: AddParams) {
    return this.groupBuyApi.addGroup(params)
  }

  // 编辑拼团活动
  @Effect()
  editGroup(params: EditParams) {
    return this.groupBuyApi.editGroup(params)
  }
}
