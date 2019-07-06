import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State } from 'rx-state'
import { tap } from 'rxjs/operators'
import { ShopStaffApi, GetStaffServiceCoursesInput } from '@/api/v1/staff/staff'

@Injectable()
export class MemberService implements RouteGuard {
    page$ = new State({})
    memberInfo$ = new State([])
    constructor(private staffApi: ShopStaffApi) {}
    getStaffServiceCourses(query: GetStaffServiceCoursesInput) {
      return this.staffApi.getStaffServiceCourses(query).pipe(
        tap(res => {
          this.page$.commit(() => res.page)
          this.memberInfo$.commit(() => res.memberInfo)
        })
      )
    }

    beforeEach(to: ServiceRoute, from: ServiceRoute) {
      console.log('member service', to.meta.query)
      const { id, page, size, keyword, shop_id } = to.meta.query
      return this.getStaffServiceCourses({ id,
        page,
        size,
        keyword,
        shop_id
      })
    }
}
