import { State } from 'rx-state'
import { BrandTeamCourseApi } from '@/api/v1/course/team/brand'
import { RouteGuard, ServiceRoute, Injectable } from 'vue-service-app'
import { tap } from 'rxjs/operators'
@Injectable()
export class InfoService implements RouteGuard {
  teamCourseInfo$ = new State({})
  constructor(private brandTeamCourseApi: BrandTeamCourseApi) {}
  SET_TEAM_COURSE_INFO(data: any) {
    this.teamCourseInfo$.commit(() => data.info)
  }
  getTeamCourseInfo(courseId: string) {
    return this.brandTeamCourseApi.getTeamCourseInfo(courseId).pipe(
      tap(res => {
        this.SET_TEAM_COURSE_INFO(res)
      })
    )
  }
  init(courseId: string) {
    return this.getTeamCourseInfo(courseId)
  }
  beforeRouteEnter(to: ServiceRoute) {
    const courseId = to.query.courseId as string
    return this.init(courseId)
  }
}
