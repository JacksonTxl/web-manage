import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { BrandPersonalCourseApi, GetPersonalBrandCourseListInput, SetAvailableInput, CoursePersonalSupportInput } from '@/api/v1/course/personal/brand'
import { forkJoin } from 'rxjs'
import { tap, pluck } from 'rxjs/operators'
import { State, Computed, Effect } from 'rx-state'
import { Store } from '@/services/store'
import { CourseApi } from '@/api/v1/setting/course'
import { ShopApi } from '@/api/v1/shop'
import { AuthService } from '@/services/auth.service'

export interface SetState {
  personalCourseList: any[],
  supportShopList: any[],
  supportCoachList: any[]
}
@Injectable()
export class BrandService implements RouteGuard {
  // loading
  loading$ = new State({})
  // 业务状态
  list$ = new State([])
  page$ = new State({})
  state$: State<SetState>
  personalCourseList$: Computed<any>
  supportShopList$: Computed<any>
  supportCoachList$: Computed<any>
  auth$: Computed<object>
  constructor(
    private personalApi: BrandPersonalCourseApi,
    private courseApi: CourseApi,
    private shopApi: ShopApi,
    private authService: AuthService
  ) {
    this.state$ = new State({
      supportShopList: [],
      supportCoachList: [],
      auth: {
        add: this.authService.can('brand_shop:product:personal_course|add')
      }
    })
    this.personalCourseList$ = new Computed(this.state$.pipe(pluck('personalCourseList')))
    this.supportShopList$ = new Computed(this.state$.pipe(pluck('supportCourseList')))
    this.supportCoachList$ = new Computed(this.state$.pipe(pluck('supportCoachList')))
    this.auth$ = new Computed(this.state$.pipe(pluck('auth')))
  }
  SET_PERSONAL_COURSE_LIST(data: any) {
    this.state$.commit(state => {
      state.personalCourseList = data.list
    })
  }
  SET_SUPPORT_COACH_LIST(data: any) {
    this.state$.commit(state => {
      state.supportCoachList = data.list
    })
  }
  SET_SUPPORT_SHOP_LIST(data: any) {
    this.state$.commit(state => {
      state.supportShopList = data.list
    })
  }
  @Effect()
  getCoursePrice(courseId: string) {
    return this.personalApi.getCoursePrice(courseId)
  }
  setAvailable(params: SetAvailableInput) {
    return this.personalApi.setAvailable(params)
  }
  deleteCourse(courseId: string) {
    return this.personalApi.deleteCourse(courseId)
  }
  getCoursePersonalSupportShops(query: CoursePersonalSupportInput) {
    return this.personalApi.getCoursePersonalSupportShops(query).pipe(tap(res => {
      this.SET_SUPPORT_SHOP_LIST(res)
    }))
  }
  getCoursePersonalSupportCoaches(query: CoursePersonalSupportInput) {
    return this.personalApi.getCoursePersonalSupportCoaches(query).pipe(tap(res => {
      this.SET_SUPPORT_COACH_LIST(res)
    }))
  }
  @Effect()
  getList(params: GetPersonalBrandCourseListInput) {
    return this.personalApi.getCourseList(params).pipe(
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
