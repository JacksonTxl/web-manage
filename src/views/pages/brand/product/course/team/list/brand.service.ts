import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { tap, pluck } from 'rxjs/operators'
import { State, Computed } from 'rx-state/src'
import { TeamApi, GetTeamBrandCourseListInput } from '@/api/v1/course/team'
@Injectable()
export class BrandService {
  state$: State<any>
  teamCourseList$: Computed<any>
  constructor(private teamApi: TeamApi) {
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
  getCourseTeamBrandList(query: any) {
    return this.teamApi.getTeamCourseListInBrand(query).pipe(
      tap(res => {
        this.SET_TEAM_COURSE_LIST(res)
      })
    )
  }
  beforeRouteUpdate(to: ServiceRoute, from: ServiceRoute, next: any) {
    const course_name = to.query.courseName
    const is_available = to.query.isAvailable
    this.getCourseTeamBrandList({ course_name, is_available }).subscribe(() => { next() })
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getCourseTeamBrandList({}).subscribe(state$ => { next() })
  }
}
