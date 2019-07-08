import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { tap, pluck } from 'rxjs/operators'
import { State, Computed, Effect } from 'rx-state'
import { BrandTeamCourseApi, GetTeamBrandCourseListInput, PutCourseTeamIntoBrandInput } from '@/api/v1/course/team/brand'
import { AuthService } from '@/services/auth.service'
import { forkJoin } from 'rxjs'
import { MessageService } from '@/services/message.service'

@Injectable()
export class ShopService {
  // loading
  loading$ = new State({})
  // 业务状态
  list$ = new State([])
  page$ = new State({})
  auth$: Computed<object>
  state$: State<any>
  constructor(
    private shopTeamCourseApi: BrandTeamCourseApi,
    private authService: AuthService,
    private msg: MessageService
  ) {
    this.state$ = new State({
      auth: {
        transfer: this.authService.can('brand_shop:product:team_course|transfer')
      }
    })
    this.auth$ = new Computed(this.state$.pipe(pluck('auth')))
  }
  @Effect()
  getList(params: GetTeamBrandCourseListInput) {
    return this.shopTeamCourseApi.getTeamCourseListInShop(params).pipe(
      tap(res => {
        res = this.authService.filter(res)
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  deleteCourse(courseId: string) {
    return this.shopTeamCourseApi.deleteCourse(courseId)
  }
  putCourseTeamIntoBrand(query: PutCourseTeamIntoBrandInput) {
    return this.shopTeamCourseApi.putCourseTeamIntoBrand(query).pipe(tap(res => {
      this.msg.success({ content: '' })
    }))
  }
  init(query: any) {
    return forkJoin(this.getList(query))
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.init({ ...to.query })
  }
}
