import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { State } from 'rx-state'
import { tap } from 'rxjs/operators'
import {
  ShopTeamCourseApi,
  GetUpdateInfoInput
} from '@/api/v1/course/team/shop'

@Injectable()
export class EditService implements Controller {
  loading$ = new State({})
  info$ = new State({})
  constructor(private courseApi: ShopTeamCourseApi) {}
  getUpdateInfo(query: GetUpdateInfoInput) {
    return this.courseApi.getUpdateInfo(query).pipe(
      tap(res => {
        this.info$.commit(() => res.info)
      })
    )
  }
  beforeRouteEnter(to: ServiceRoute) {
    return this.getUpdateInfo({
      course_id: to.meta.query.id
    })
  }
}
