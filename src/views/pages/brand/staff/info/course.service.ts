import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { StaffApi, GetStaffServiceCoursesInput } from '@/api/v1/staff'

interface CourseState{
    courseInfo: Object
}
@Injectable()
export class CourseService extends Store<CourseState> {
    state$: State<CourseState>
    courseInfo$: Computed<Object>
    constructor(private staffapi: StaffApi) {
      super()
      this.state$ = new State({
        courseInfo: {}
      })
      this.courseInfo$ = new Computed(this.state$.pipe(pluck('courseInfo')))
    }
    getCoursesList(id: string, query: GetStaffServiceCoursesInput) {
      return this.staffapi.getStaffServiceCourses(id, query).pipe(
        tap(res => {
          this.state$.commit(state => {
            state.courseInfo = res
          })
        })
      )
    }

    beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
      console.log('sold service', to.meta.query)
      const { id } = to.meta.query
      console.log('sold service')
      this.getCoursesList(id, {

      }).subscribe(() => {
        next()
      })
    }
}
