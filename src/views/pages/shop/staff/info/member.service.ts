import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { StaffApi, GetStaffServiceCoursesInput } from '@/api/v1/staff'

interface MemberState{
    memberInfo: Object
}
@Injectable()
export class MemberService extends Store<MemberState> {
    state$: State<MemberState>
    memberInfo$: Computed<Object>
    constructor(private staffapi: StaffApi) {
      super()
      this.state$ = new State({
        memberInfo: {}
      })
      this.memberInfo$ = new Computed(this.state$.pipe(pluck('memberInfo')))
    }
    getStaffServiceCourses(id: string, query: GetStaffServiceCoursesInput) {
      return this.staffapi.getStaffServiceCourses(id, query).pipe(
        tap(res => {
          this.state$.commit(state => {
            state.memberInfo = res
          })
        })
      )
    }

    beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
      console.log('member service', to.meta.query)
      const { id, page, size, keyword, shop_id } = to.meta.query
      this.getStaffServiceCourses(id, {
        page,
        size,
        keyword,
        shop_id
      }).subscribe(() => {
        next()
      })
    }
}
