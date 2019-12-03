import {
  Injectable,
  Controller,
  RouteGuard,
  ServiceRoute
} from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { GroupBuyApi, AddParams } from '@/api/v1/marketing/group-buy'
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
  createGroupbuy(params: AddParams) {
    return this.GroupBuyApi.addGroup(params)
  }
  // 获取私教课列表
  @Effect()
  getPersonalList() {
    return this.GroupBuyApi.getPersonalList().pipe(
      tap((res: any) => {
        this.personalList$.commit(() => res.list)
        this.loading$.commit(() => res.loading)
      })
    )
  }
  // 获取该课程的教练列表
  @Effect()
  getCoachList(id: number) {
    return this.GroupBuyApi.getCoachList(id).pipe(
      tap((res: any) => {
        console.log(res)
        this.coachList$.commit(() => res.list)
      })
    )
  }
  init() {
    return anyAll(this.getPersonalList())
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    return this.init()
  }
}
