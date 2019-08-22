import { UserService } from '@/services/user.service'
import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap, map } from 'rxjs/operators'
import { StaffApi, GetStaffCourseListInput } from '@/api/v1/staff'

@Injectable()
export class CourseService implements RouteGuard {
  courseInfo$ = new State({})
  page$ = new State({})
  loading$ = new State({})
  reserveStatus$ = this.userService
    .getOptions$('schedule.schedule_status')
    .pipe(
      map(options => [{ value: -1, label: '全部课程状态' }].concat(options))
    )

  constructor(private staffApi: StaffApi, private userService: UserService) {}
  @Effect()
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
    const { id, ...query } = to.meta.query
    return this.getCoursesList(id, query)
  }
}
