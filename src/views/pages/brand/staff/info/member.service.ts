import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { StaffApi, GetStaffServiceCoursesInput } from '@/api/v1/staff'

@Injectable()
export class MemberService implements RouteGuard {
  memberInfo$ = new State({})
  page$ = new State({})
  loading$ = new State({})

  constructor(private staffapi: StaffApi) {}
  @Effect()
  getStaffServiceCourses(id: string, query: GetStaffServiceCoursesInput) {
    return this.staffapi.getStaffServiceCourses(id, query).pipe(
      tap(res => {
        this.memberInfo$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }

  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    console.log('member service', to.meta.query)
    const { id, page, size, keyword, shop_id } = to.meta.query
    return this.getStaffServiceCourses(id, {
      page,
      size,
      keyword,
      shop_id
    })
  }
}
