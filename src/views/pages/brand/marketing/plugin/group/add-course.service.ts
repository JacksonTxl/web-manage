import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { GroupBuyApi, AddParams } from '@/api/v1/marketing/group-buy'
import { anyAll } from '@/operators'
import { tap } from 'rxjs/operators'
import { forkJoin } from 'rxjs'

@Injectable()
export class AddCourseService {
  loading$ = new State({})
  courseList$ = new State({})
  constructor(private groupBuyApi: GroupBuyApi) {}
  @Effect()
  getCourseList(params: { shop_id: number }) {
    return this.groupBuyApi.getCourseList(params).pipe(
      tap((res: any) => {
        this.courseList$.commit(() => res.list)
        this.loading$.commit(() => {})
      })
    )
  }
  // 新增拼团活动
  @Effect()
  createGroupbuy(params: AddParams) {
    return this.groupBuyApi.addGroup(params)
  }
}
