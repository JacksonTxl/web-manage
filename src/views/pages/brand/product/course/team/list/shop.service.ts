import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { tap, pluck } from 'rxjs/operators'
import { State, Computed } from 'rx-state/src'
import { BrandTeamCourseApi, GetTeamBrandCourseListInput, PutCourseTeamIntoBrandInput } from '@/api/v1/course/team/brand'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class ShopService {
  state$: State<any>
  teamCourseList$: Computed<any>
  auth$: Computed<object>
  constructor(
    private shopTeamCourseApi: BrandTeamCourseApi,
    private authService: AuthService
  ) {
    this.state$ = new State({
      teamCourseList: [],
      auth: {
        transfer: this.authService.can('brand_shop:product:team_course|transfer')
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
  getTeamCourseListInShop(params: GetTeamBrandCourseListInput) {
    return this.shopTeamCourseApi.getTeamCourseListInShop(params).pipe(
      tap(state => {
        state = this.authService.filter(state)
        this.SET_TEAM_COURSE_LIST(state)
      })
    )
  }
  deleteCourse(courseId: string) {
    return this.shopTeamCourseApi.deleteCourse(courseId)
  }
  putCourseTeamIntoBrand(query: PutCourseTeamIntoBrandInput) {
    return this.shopTeamCourseApi.putCourseTeamIntoBrand(query)
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getTeamCourseListInShop({}).subscribe(() => next())
  }
}
