import { State, Computed } from 'rx-state'
import { TeamApi } from './../../../../../../api/v1/course/team'
import { GetTeamBrandCourseListInput } from '@/api/v1/course/team'
import { RouteGuard, ServiceRoute, Injectable } from 'vue-service-app'
import { tap, pluck } from 'rxjs/operators'
import {
  BrandPersonalCourseApi,
  GetPersonalBrandInfoInput
} from '@/api/v1/course/personal/brand'
export interface PersonalCourseInfo {
  personalCourseInfo: any
}
@Injectable()
export class InfoService implements RouteGuard {
  state$: State<PersonalCourseInfo>
  personalCourseInfo$: Computed<any>
  constructor(private brandPersonalCourseApi: BrandPersonalCourseApi) {
    this.state$ = new State({
      personalCourseInfo: {}
    })
    this.personalCourseInfo$ = new Computed(
      this.state$.pipe(pluck('personalCourseInfo'))
    )
  }
  SET_TEAM_COURSE_INFO(data: any) {
    this.state$.commit(state => {
      state.personalCourseInfo = data.info
    })
  }
  getPersonalBrandInfo(query: GetPersonalBrandInfoInput) {
    return this.brandPersonalCourseApi.getPersonalBrandInfo(query).pipe(
      tap(res => {
        this.SET_TEAM_COURSE_INFO(res)
      })
    )
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    const course_id = to.query.id as string
    this.getPersonalBrandInfo({ course_id }).subscribe(() => next())
  }
}
