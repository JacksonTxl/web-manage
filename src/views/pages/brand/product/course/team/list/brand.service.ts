import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { tap, pluck } from 'rxjs/operators'
import { State, Computed, Effect } from 'rx-state'
import { BrandTeamCourseApi, GetTeamBrandCourseListInput } from '@/api/v1/course/team/brand'
import { AuthService } from '@/services/auth.service'
import { forkJoin } from 'rxjs'

@Injectable()
export class BrandService implements RouteGuard {
  // loading
  loading$ = new State({})
  // 业务状态
  list$ = new State([])
  page$ = new State({})

  state$: State<any>
  auth$: Computed<object>
  constructor(
    private brandTeamCourseApi: BrandTeamCourseApi,
    private authService: AuthService
  ) {
    this.state$ = new State({
      auth: {
        add: this.authService.can('brand_shop:product:team_course|add')
      }
    })
    this.auth$ = new Computed(this.state$.pipe(pluck('auth')))
  }
  deleteCourse(courseId: string) {
    return this.brandTeamCourseApi.deleteCourse(courseId)
  }
  @Effect()
  getList(query: any) {
    return this.brandTeamCourseApi.getTeamCourseList(query).pipe(
      tap(res => {
        res = this.authService.filter(res)
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  init(query: any) {
    return forkJoin(this.getList(query))
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.init({ ...to.query })
  }
}
