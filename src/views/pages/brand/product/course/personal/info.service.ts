import { State } from 'rx-state'
import { RouteGuard, ServiceRoute, Injectable } from 'vue-service-app'
import { tap } from 'rxjs/operators'
import {
  BrandPersonalCourseApi,
  GetPersonalBrandInfoInput
} from '@/api/v1/course/personal/brand'
@Injectable()
export class InfoService implements RouteGuard {
  personalCourseInfo$ = new State({})
  constructor(private brandPersonalCourseApi: BrandPersonalCourseApi) {}
  SET_TEAM_COURSE_INFO(data: any) {
    this.personalCourseInfo$.commit(() => data.info)
  }
  getPersonalBrandInfo(query: GetPersonalBrandInfoInput) {
    return this.brandPersonalCourseApi.getPersonalBrandInfo(query).pipe(
      tap(res => {
        this.SET_TEAM_COURSE_INFO(res)
      })
    )
  }
  init(query: GetPersonalBrandInfoInput) {
    return this.getPersonalBrandInfo(query)
  }
  beforeRouteEnter(to: ServiceRoute) {
    const course_id = to.query.id as string
    return this.init({ course_id })
  }
}
