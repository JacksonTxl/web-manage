import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
// import { AuthService } from '@/services/auth.service'
import { GroupBuyApi, EditParams } from '@/api/v1/marketing/group-buy'
import { tap } from 'rxjs/operators'
import { anyAll } from '@/operators'

@Injectable()
export class EditCourseService implements Controller {
  info$ = new State({})
  loading$ = new State({})
  courseList$ = new State({})
  constructor(private groupBuyApi: GroupBuyApi) {}
  @Effect()
  editGroupbuy(params: EditParams) {
    return this.groupBuyApi.editGroup(params)
  }
  @Effect()
  getDetailData(id: number) {
    return this.groupBuyApi.getStoredData(id).pipe(
      tap((res: any) => {
        this.info$.commit(() => res.info)
      })
    )
  }
  @Effect()
  getCourseList(params: { shop_id: number }) {
    return this.groupBuyApi.getCourseList(params).pipe(
      tap((res: any) => {
        this.courseList$.commit(() => res.list)
      })
    )
  }
  @Effect()
  init(id: any) {
    return anyAll(this.getDetailData(id))
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    return this.init(to.meta.query.id)
  }
}
