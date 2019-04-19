import { State } from 'rx-state/src'
import { TeamApi } from './../../../../../../api/v1/course/team'
import { GetTeamBrandCourseListInput } from '@/api/v1/course/team'
import { RouteGuard, ServiceRoute, Injectable } from 'vue-service-app'
import { tap } from 'rxjs/operators'
export interface TeamCourseInfo {
  teamCourseInfo: any
}
@Injectable()
export class InfoService implements RouteGuard {
  state$: State<TeamCourseInfo>
  constructor(private teamApi: TeamApi) {
    this.state$ = new State({
      teamCourseInfo: {}
    })
  }
  SET_TEAM_COURSE_INFO(data: any) {
    this.state$.commit(state => {
      state.teamCourseInfo = data.info
    })
  }
  getTeamCourseInfo(courseId: string) {
    return this.teamApi.getTeamCourseInfo(courseId).pipe(tap(res => {
      this.SET_TEAM_COURSE_INFO(res)
    }))
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getTeamCourseInfo('1').subscribe()
  }
}
