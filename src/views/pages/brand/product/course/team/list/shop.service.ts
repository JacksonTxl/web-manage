import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { tap, pluck } from 'rxjs/operators'
import { State, Computed } from 'rx-state'
import { BrandTeamCourseApi, GetTeamBrandCourseListInput, PutCourseTeamIntoBrandInput } from '@/api/v1/course/team/brand'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class ShopService {
  state$: State<any>
  teamCourseList$: Computed<any>
  auth$: Computed<object>
  page$: Computed<object>
  constructor(
    private shopTeamCourseApi: BrandTeamCourseApi,
    private authService: AuthService
  ) {
    this.state$ = new State({
      teamCourseList: [],
      auth: {
        transfer: this.authService.can('brand_shop:product:team_course|transfer')
      },
      page: {}
    })
    this.teamCourseList$ = new Computed(this.state$.pipe(pluck('teamCourseList')))
    this.auth$ = new Computed(this.state$.pipe(pluck('auth')))
    this.page$ = new Computed(this.state$.pipe(pluck('page')))
  }
  SET_TEAM_COURSE_LIST(data: any) {
    this.state$.commit(state => {
      state.teamCourseList = data.list
    })
  }
  getTeamCourseListInShop(params: GetTeamBrandCourseListInput) {
    return this.shopTeamCourseApi.getTeamCourseListInShop(params).pipe(
      tap(res => {
        res = this.authService.filter(res)
        this.state$.commit(state => {
          state.page = res.page
        })
        this.SET_TEAM_COURSE_LIST(res)
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
    this.getTeamCourseListInShop({ size: 99 }).subscribe(() => next())
  }
}
