import { CourseApi } from './../../../../../../../api/v1/setting/course'
import { ShopApi } from '@/api/v1/shop'
import { RouteGuard, ServiceRoute, Injectable } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state/src'
import { tap, map } from 'rxjs/operators'
import { forkJoin } from 'rxjs'
import { ShopPersonalCourseApi, GetPersonalCourseListInShopInput } from '@/api/v1/course/personal/shop'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class ListService implements RouteGuard {
  personalCourseList$ = new State<any[]>([])
  categoryList$ = new State<any[]>([])
  shopSelectOptions$ = new State<any[]>([])
  auth$ = new State({
    add: this.authService.can('brand_shop:product:personal_course|add')
  })
  constructor(
    private shopPersonalCourseApi: ShopPersonalCourseApi,
    private shopApi: ShopApi,
    private courseApi: CourseApi,
    private authService: AuthService
  ) {
  }
  SET_PERSONAL_COURSE_LIST(data: any) {
    this.personalCourseList$.commit(() => data.list)
  }
  getCategoryList() {
    return this.courseApi.getCourseCategoryList({}).pipe(
      map(res => {
        const list = res.list
        return [{ id: -1, setting_name: '所有课程类型' }, ...list.map((item: any) => {
          const { id, setting_name } = item
          return {
            id, setting_name
          }
        })]
      }),
      tap(state => {
        this.categoryList$.commit(() => state)
      })
    )
  }
  getShopList() {
    return this.shopApi.getShopList().pipe(map(res => {
      const shopInfo = res.shop_info
      return [{ shop_id: -1, shop_name: '所有门店' }, ...shopInfo.map((item: any) => {
        const { shop_id, shop_name } = item
        return {
          shop_id,
          shop_name
        }
      })]
    }),
    tap(state => {
      this.shopSelectOptions$.commit(() => state)
    }))
  }
  init() {
    return forkJoin(this.getShopList(), this.getCategoryList())
  }
  @Effect()
  getCoursePersonalBrandList(params: any) {
    return this.shopPersonalCourseApi.getCourseList(params).pipe(
      tap(state => {
        state = this.authService.filter(state)
        this.SET_PERSONAL_COURSE_LIST(state)
      })
    )
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getCoursePersonalBrandList({ size: 99, ...to.query }).subscribe(() => next())
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.init().subscribe(() => next())
  }
}
