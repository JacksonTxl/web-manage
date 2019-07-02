import { State, Computed } from 'rx-state'
import { RouteGuard, ServiceRoute, Injectable } from 'vue-service-app'
import { tap, pluck } from 'rxjs/operators'
import { ShopTeamCourseApi } from '@/api/v1/course/team/shop'
export interface TeamCourseInfo {
  teamCourseInfo: any
}
@Injectable()
export class InfoService implements RouteGuard {
  state$: State<TeamCourseInfo>
  teamCourseInfo$: Computed<any>
  constructor(private shopTeamCourseApi: ShopTeamCourseApi) {
    this.state$ = new State({
      teamCourseInfo: {}
    })
    this.teamCourseInfo$ = new Computed(this.state$.pipe(pluck('teamCourseInfo')))
  }
  SET_TEAM_COURSE_INFO(data: any) {
    this.state$.commit(state => {
      state.teamCourseInfo = data.info
    })
  }
  getTeamCourseInfo(courseId: string) {
    return this.shopTeamCourseApi.getTeamCourseInfo(courseId).pipe(tap(res => {
      this.SET_TEAM_COURSE_INFO(res)
    }))
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    const courseId = to.query.courseId as string
    this.getTeamCourseInfo(courseId).subscribe(() => next())
  }
}
