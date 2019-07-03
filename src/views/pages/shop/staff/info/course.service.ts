import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { ShopStaffApi, GetStaffCourseListInput } from '@/api/v1/staff/staff'

interface CourseState{
    courseInfo: Object
}
@Injectable()
export class CourseService extends Store<CourseState> {
    state$: State<CourseState>
    courseInfo$: Computed<Object>
    constructor(private staffApi: ShopStaffApi) {
      super()
      this.state$ = new State({
        courseInfo: {}
      })
      this.courseInfo$ = new Computed(this.state$.pipe(pluck('courseInfo')))
    }
    getCoursesList(query: GetStaffCourseListInput) {
      return this.staffApi.getStaffCourseList(query).pipe(
        tap(res => {
          let result: any = {
            page: res.page,
            list: []
          }
          res.list.forEach((ele: any) => {
            result.list.push(ele)
          })
          this.state$.commit(state => {
            state.courseInfo = result
          })
        })
      )
    }

    beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
      this.getCoursesList(to.query).subscribe(() => {
        next()
      })
    }
}
