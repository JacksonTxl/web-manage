import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { ShopPersonalCourseApi, GetPersonalBrandCourseListInput } from '@/api/v1/course/personal/shop'
import { tap, pluck } from 'rxjs/operators'
import { State, Computed } from 'rx-state'
import { forkJoin } from 'rxjs'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class ShopService implements RouteGuard {
  // loading
  loading$ = new State({})
  // 业务状态
  list$ = new State([])
  page$ = new State({})

  state$: State<any>
  auth$: Computed<object>
  constructor(
    private shopPersonalCourseApi: ShopPersonalCourseApi,
    private authService: AuthService
  ) {
    this.state$ = new State({
      auth: {
        transfer: this.authService.can('brand_shop:product:personal_course|transfer')
      }
    })
    this.auth$ = new Computed(this.state$.pipe(pluck('auth')))
  }
  SET_PERSONAL_COURSE_LIST(data: any) {
    this.state$.commit(state => {
      state.personalCourseList = data.list
    })
  }
  upgradePersonalCourseInBrand(res: any) {
    return this.shopPersonalCourseApi.upgradePersonalCourseInBrand(res)
  }
  getList(params: any) {
    return this.shopPersonalCourseApi.getCourseListInBrand(params).pipe(
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
