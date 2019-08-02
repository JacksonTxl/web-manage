import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { ShopStaffApi, GetStaffCourseListInput } from '@/api/v1/staff/staff'

@Injectable()
export class CourseService implements RouteGuard {
  courseInfo$ = new State({})
  page$ = new State({})
  loading$ = new State({})
  constructor(private staffApi: ShopStaffApi) {}
  @Effect()
  getCoursesList(id: string, query: GetStaffCourseListInput) {
    return this.staffApi.getStaffCourseList(id, query).pipe(
      tap(res => {
        this.courseInfo$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }

  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    const { id, ...query } = to.meta.query
    return this.getCoursesList(id, query)
  }
}
