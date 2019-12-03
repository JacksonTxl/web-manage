import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import {
  AddParams,
  EditParams,
  GroupBuyApi
} from '@/api/v1/marketing/group-buy'
import { anyAll } from '@/operators'
import { tap } from 'rxjs/operators'

@Injectable()
export class AddMemberService implements Controller {
  loading$ = new State({})
  memberList$ = new State([])
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
  // 获取会籍卡列表
  @Effect()
  getMemberList() {
    return this.groupBuyApi.getMemberList().pipe(
      tap((res: any) => {
        this.memberList$.commit(() => res.list)
      })
    )
  }
  init() {
    return anyAll(this.getMemberList())
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    return this.init()
  }
}
