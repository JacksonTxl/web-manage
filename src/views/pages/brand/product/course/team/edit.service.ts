import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State } from 'rx-state'
import { tap } from 'rxjs/operators'
import {
  BrandTeamCourseApi,
  GetUpdateInfoInput
} from '@/api/v1/course/team/brand'
@Injectable()
export class EditService implements RouteGuard {
  info$ = new State({})
  constructor(private courseApi: BrandTeamCourseApi) {}
  getUpdateInfo(query: GetUpdateInfoInput) {
    return this.courseApi.getUpdateInfo(query).pipe(
      tap(res => {
        this.info$.commit(() => res.info)
      })
    )
  }
  init(query: GetUpdateInfoInput) {
    return this.getUpdateInfo(query)
  }
  beforeRouteEnter(to: ServiceRoute) {
    const query = {
      course_id: to.meta.query.id
    }
    return this.init(query)
  }
}
