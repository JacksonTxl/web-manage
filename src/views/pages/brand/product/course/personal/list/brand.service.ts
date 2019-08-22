import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import {
  BrandPersonalCourseApi,
  GetPersonalBrandCourseListInput,
  SetAvailableInput,
  CoursePersonalSupportInput
} from '@/api/v1/course/personal/brand'
import { forkJoin } from 'rxjs'
import { tap } from 'rxjs/operators'
import { State, Effect } from 'rx-state'
import { AuthService } from '@/services/auth.service'
@Injectable()
export class BrandService implements RouteGuard {
  // loading
  loading$ = new State({})
  // 业务状态
  list$ = new State([])
  page$ = new State({})
  supportShopList$ = new State([])
  supportCoachList$ = new State([])
  auth$ = this.authService.authMap$({
    add: 'brand_shop:product:personal_course|add'
  })
  constructor(
    private personalApi: BrandPersonalCourseApi,
    private authService: AuthService
  ) {}
  SET_SUPPORT_COACH_LIST(data: any) {
    this.supportCoachList$.commit(() => data.list)
  }
  SET_SUPPORT_SHOP_LIST(data: any) {
    this.supportShopList$.commit(() => data.list)
  }

  setAvailable(params: SetAvailableInput) {
    return this.personalApi.setAvailable(params)
  }
  deleteCourse(courseId: string) {
    return this.personalApi.deleteCourse(courseId)
  }
  getCoursePersonalSupportShops(query: CoursePersonalSupportInput) {
    return this.personalApi.getCoursePersonalSupportShops(query).pipe(
      tap(res => {
        this.SET_SUPPORT_SHOP_LIST(res)
      })
    )
  }
  getCoursePersonalSupportCoaches(query: CoursePersonalSupportInput) {
    return this.personalApi.getCoursePersonalSupportCoaches(query).pipe(
      tap(res => {
        this.SET_SUPPORT_COACH_LIST(res)
      })
    )
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
  beforeEach(to: ServiceRoute) {
    return this.init({ ...to.query })
  }
}
