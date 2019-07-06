import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State } from 'rx-state'
import { tap } from 'rxjs/operators'
import { StaffApi, GetStaffCourseListInput } from '@/api/v1/staff'

@Injectable()
export class CourseService implements RouteGuard {
    courseInfo$ = new State({})
    page$ = new State({})
    constructor(private staffApi: StaffApi) {}
    getCoursesList(id: string, query: GetStaffCourseListInput) {
      return this.staffApi.getStaffCourseList(id, query).pipe(
        tap(res => {
          this.courseInfo$.commit(() => {
            return res.list.map((item: any) => {
              item.class_hours = `${item.start_time} ~ ${item.stop_time}`
              return item
            })
          })
          this.page$.commit(() => res.page)
        })
      )
    }

    beforeEach(to: ServiceRoute, from: ServiceRoute) {
      const { id } = to.meta.query
      return this.getCoursesList(id, {
      })
    }
}
