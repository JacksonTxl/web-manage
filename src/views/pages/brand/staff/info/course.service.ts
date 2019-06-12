import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { StaffApi, GetStaffCourseListInput } from '@/api/v1/staff'
import { forEach } from 'lodash-es'

interface CourseState{
    courseInfo: Object
}
@Injectable()
export class CourseService extends Store<CourseState> {
    state$: State<CourseState>
    courseInfo$: Computed<Object>
    constructor(private staffApi: StaffApi) {
      super()
      this.state$ = new State({
        courseInfo: {}
      })
      this.courseInfo$ = new Computed(this.state$.pipe(pluck('courseInfo')))
    }
    getCoursesList(id: string, query: GetStaffCourseListInput) {
      return this.staffApi.getStaffCourseList(id, query).pipe(
        tap(res => {
          this.state$.commit(state => {
            state.courseInfo = res.list.map((item: any) => {
              item.class_hours = `${item.start_time} ~ ${item.stop_time}`
              return item
            })
          })
        })
      )
    }

    beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
      const { id } = to.meta.query
      this.getCoursesList(id, {
      }).subscribe(() => {
        next()
      })
    }
}
