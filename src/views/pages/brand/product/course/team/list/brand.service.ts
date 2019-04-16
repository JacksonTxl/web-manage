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
  getCourseTeamBrandList(params: GetTeamBrandCourseListInput) {
    return this.teamApi.getTeamBrandCourseList(params).pipe(
      tap(state => {
        this.SET_TEAM_COURSE_LIST(state)
      })
    )
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getCourseTeamBrandList({}).subscribe(state$ => next())
  }
}