import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { tap, pluck } from 'rxjs/operators'
import { State, Computed } from 'rx-state/src'
import { BrandTeamCourseApi, GetTeamBrandCourseListInput } from '@/api/v1/course/team/brand'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class BrandService implements RouteGuard {
  state$: State<any>
  teamCourseList$: Computed<any>
  auth$: Computed<object>
  constructor(
    private brandTeamCourseApi: BrandTeamCourseApi,
    private authService: AuthService
  ) {
    this.state$ = new State({
      teamCourseList: [],
      auth: {
        add: this.authService.can('brand_shop:product:team_course|add')
      }
    })
    this.teamCourseList$ = new Computed(this.state$.pipe(pluck('teamCourseList')))
    this.auth$ = new Computed(this.state$.pipe(pluck('auth')))
  }
  SET_TEAM_COURSE_LIST(data: any) {
    this.state$.commit(state => {
      state.teamCourseList = data.list
    })
  }
  deleteCourse(courseId: string) {
    return this.brandTeamCourseApi.deleteCourse(courseId)
  }
  getCourseTeamBrandList(query: any) {
    return this.brandTeamCourseApi.getTeamCourseList(query).pipe(
      tap(res => {
        res = this.authService.filter(res)
        this.SET_TEAM_COURSE_LIST(res)
      })
    )
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    console.log(to.query)
    this.getCourseTeamBrandList({ size: 99, ...to.query }).subscribe(state$ => { next() })
  }
}
