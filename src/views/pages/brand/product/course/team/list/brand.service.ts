import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { tap, pluck } from 'rxjs/operators'
import { State, Computed } from 'rx-state/src'
import { BrandTeamCourseApi, GetTeamBrandCourseListInput } from '@/api/v1/course/team/brand'
@Injectable()
export class BrandService implements RouteGuard {
  state$: State<any>
  teamCourseList$: Computed<any>
  constructor(private brandTeamCourseApi: BrandTeamCourseApi) {
    this.state$ = new State({
      teamCourseList: []
    })
    this.teamCourseList$ = new Computed(this.state$.pipe(pluck('teamCourseList')))
  }
  SET_TEAM_COURSE_LIST(data: any) {
    this.state$.commit(state => {
      state.teamCourseList = data.list
    })
  }
  deleteCourse(courseId: string) {
    return this.brandTeamCourseApi.deleteCourse(courseId)
  }
  getCourseTeamBrandList(query: any) {
    return this.brandTeamCourseApi.getTeamCourseList(query).pipe(
      tap(res => {
        this.SET_TEAM_COURSE_LIST(res)
      })
    )
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    console.log(to.query)
    this.getCourseTeamBrandList(to.query).subscribe(state$ => { next() })
  }
}
