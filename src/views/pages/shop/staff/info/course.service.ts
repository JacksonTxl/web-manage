import { UserService } from '@/services/user.service'
import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap, map } from 'rxjs/operators'
import { ShopStaffApi, GetStaffCourseListInput } from '@/api/v1/staff/staff'

@Injectable()
export class CourseService implements RouteGuard {
  courseInfo$ = new State({})
  page$ = new State({})
  loading$ = new State({})
  reserveStatus$ = this.userService
    .getOptions$('reserve.reserve_status')
    .pipe(
      map(options => [{ value: -1, label: '全部课程状态' }].concat(options))
    )
  constructor(
    private staffApi: ShopStaffApi,
    private userService: UserService
  ) {}
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
