import {
  Injectable,
  Controller,
  RouteGuard,
  ServiceRoute
} from 'vue-service-app'
import { State, Effect } from 'rx-state'
import {
  GroupBuyApi,
  AddParams,
  EditParams
} from '@/api/v1/marketing/group_buy'
import { anyAll } from '@/operators'
import { tap } from 'rxjs/operators'

@Injectable()
export class AddPersonalService implements Controller {
  loading$ = new State({})
  personalList$ = new State([])
  coachList$ = new State([])
  constructor(private GroupBuyApi: GroupBuyApi) {}

  // 新增拼团活动
  @Effect()
  addGroup(params: AddParams) {
    return this.GroupBuyApi.addGroup(params)
  }

  // 编辑拼团活动
  @Effect()
  editGroup(params: EditParams) {
    return this.GroupBuyApi.editGroup(params)
  }
  // 获取私教列表
  @Effect()
  getList() {
    return this.GroupBuyApi.getPersonalList().pipe(
      tap((res: any) => {
        this.personalList$.commit(() => res.list)
      })
    )
  }
  @Effect()
  addCoach(params: { id: number }) {
    return this.GroupBuyApi.getCoachList(params).pipe(
      tap((res: any) => {
        this.coachList$.commit(() => res.list)
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
