import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State } from 'rx-state'
import { tap } from 'rxjs/operators'
import { ShopStaffApi, GetStaffCourseListInput } from '@/api/v1/staff/staff'

@Injectable()
export class CourseService implements RouteGuard {
    courseInfo$ = new State({})
    page$ = new State({})
    constructor(private staffApi: ShopStaffApi) {}
    getCoursesList(query: GetStaffCourseListInput) {
      return this.staffApi.getStaffCourseList(query).pipe(
        tap(res => {
          this.courseInfo$.commit(() => res.list)
          this.page$.commit(() => res.page)
        })
      )
    }

    beforeEach(to: ServiceRoute, from: ServiceRoute) {
      return this.getCoursesList(to.query)
    }
}
