import { CourseApi } from './../../../../../../../api/v1/setting/course'
import { ShopApi } from '@/api/v1/shop'
import { RouteGuard, ServiceRoute, Injectable } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { tap, map } from 'rxjs/operators'
import { forkJoin } from 'rxjs'
import { ShopPersonalCourseApi, GetPersonalCourseListInShopInput } from '@/api/v1/course/personal/shop'
import { AuthService } from '@/services/auth.service'
import { MessageService } from '@/services/message.service'

@Injectable()
export class ListService implements RouteGuard {
  // loading
  loading$ = new State({})
  // 业务状态
  list$ = new State([])
  page$ = new State({})
  categoryList$ = new State<any[]>([])
  shopSelectOptions$ = new State<any[]>([])
  auth$ = new State({
    add: this.authService.can('brand_shop:product:personal_course|add')
  })
  constructor(
    private shopPersonalCourseApi: ShopPersonalCourseApi,
    private shopApi: ShopApi,
    private courseApi: CourseApi,
    private msg: MessageService,
    private authService: AuthService
  ) {}
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
  getCoursePriceList(id: any) {
    return this.shopPersonalCourseApi.getCoursePriceList(id)
  }
  deleteCourse(id: any) {
    return this.shopPersonalCourseApi.deleteCourse(id).pipe(tap(res => {
      this.msg.success({ content: '删除成功' })
    }))
  }
  getShopList() {
    return this.shopApi.getShopList().pipe(map(res => {
      const shopInfo = res.list
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
  initOptions() {
    return forkJoin(this.getShopList(), this.getCategoryList())
  }
  @Effect()
  getList(params: any) {
    return this.shopPersonalCourseApi.getCourseList(params).pipe(
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
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    return this.initOptions()
  }
}
