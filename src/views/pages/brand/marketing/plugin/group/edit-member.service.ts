import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
// import { AuthService } from '@/services/auth.service'
import { GroupBuyApi, EditParams } from '@/api/v1/marketing/group_buy'
import { tap } from 'rxjs/operators'
import { anyAll } from '@/operators'

@Injectable()
export class EditMemberService implements Controller {
  loading$ = new State({})
  info$ = new State({})
  memberList$ = new State([])
  constructor(private groupBuyApi: GroupBuyApi) {}
  getStoredData(id: number) {
    return this.groupBuyApi.getStoredData(id).pipe(
      tap((res: any) => {
        this.info$.commit(() => res.info)
      })
    )
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
  @Effect()
  init(id: any) {
    return anyAll(this.getStoredData(id), this.getMemberList())
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    return this.init(to.meta.query.id)
  }
}
