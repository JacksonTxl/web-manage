import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { tap, pluck } from 'rxjs/operators'
import { State, Computed } from 'rx-state/src'
import { ShopTeamCourseApi, GetTeamBrandCourseListInput, putCourseTeamIntoBrandInput } from '@/api/v1/course/team/shop'
@Injectable()
export class ShopService {
  state$: State<any>
  teamCourseList$: Computed<any>
  constructor(private shopTeamCourseApi: ShopTeamCourseApi) {
    this.state$ = new State({
      teamCourseList: []
    })
    this.teamCourseList$ = new Computed(this.state$.pipe(pluck('teamCourseList')))
  }
  SET_TEAM_COURSE_LIST(data: any) {
    this.state$.commit(state => {
      state.teamCourseList = data.list
    })
  }
  getTeamCourseListInShop(params: GetTeamBrandCourseListInput) {
    return this.shopTeamCourseApi.getTeamCourseListInShop(params).pipe(
      tap(state => {
        this.SET_TEAM_COURSE_LIST(state)
      })
    )
  }
  deleteCourse(courseId: string) {
    return this.shopTeamCourseApi.deleteTeamCourse(courseId)
  }
  putCourseTeamIntoBrand(query: putCourseTeamIntoBrandInput) {
    return this.shopTeamCourseApi.putCourseTeamIntoBrand(query)
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getTeamCourseListInShop({}).subscribe(() => next())
  }
}
