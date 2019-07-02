import { State, Computed } from 'rx-state'
import { BrandTeamCourseApi } from './../../../../../../api/v1/course/team/brand'
import { GetTeamBrandCourseListInput } from '@/api/v1/course/team'
import { RouteGuard, ServiceRoute, Injectable } from 'vue-service-app'
import { tap, pluck } from 'rxjs/operators'
export interface TeamCourseInfo {
  teamCourseInfo: any
}
@Injectable()
export class InfoService implements RouteGuard {
  state$: State<TeamCourseInfo>
  teamCourseInfo$: Computed<any>
  constructor(private brandTeamCourseApi: BrandTeamCourseApi) {
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
    return this.brandTeamCourseApi.getTeamCourseInfo(courseId).pipe(tap(res => {
      this.SET_TEAM_COURSE_INFO(res)
    }))
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    const courseId = to.query.courseId as string
    this.getTeamCourseInfo(courseId).subscribe(() => next())
  }
}
