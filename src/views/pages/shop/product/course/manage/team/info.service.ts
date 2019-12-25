import { State } from 'rx-state'
import { Controller, ServiceRoute, Injectable } from 'vue-service-app'
import { tap } from 'rxjs/operators'
import { ShopTeamCourseApi } from '@/api/v1/course/team/shop'

@Injectable()
export class InfoService implements Controller {
  teamCourseInfo$ = new State({})
  constructor(private shopTeamCourseApi: ShopTeamCourseApi) {}
  getTeamCourseInfo(courseId: string) {
    return this.shopTeamCourseApi.getTeamCourseInfo(courseId).pipe(
      tap(res => {
        this.teamCourseInfo$.commit(() => res.info)
      })
    )
  }
  beforeRouteEnter(to: ServiceRoute) {
    return this.getTeamCourseInfo(to.query.courseId as string)
  }
}
