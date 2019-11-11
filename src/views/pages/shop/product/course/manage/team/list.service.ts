import { CourseApi } from '@/api/v1/setting/course'
import { ShopApi } from '@/api/v1/shop'
import { Controller, ServiceRoute, Injectable } from 'vue-service-app'
import { State } from 'rx-state'
import { tap, map } from 'rxjs/operators'
import { forkJoin } from 'rxjs'
import {
  ShopTeamCourseApi,
  GetTeamBrandCourseListInput
} from '@/api/v1/course/team/shop'
import { AuthService } from '@/services/auth.service'
import { RedirectService } from '@/services/redirect.service'

@Injectable()
export class ListService implements Controller {
  // loading
  loading$ = new State({})
  // 业务状态
  list$ = new State([])
  page$ = new State({})
  categoryList$ = new State<any[]>([])
  shopSelectOptions$ = new State<any[]>([])
  state$: State<any>
  auth$ = this.authService.authMap$({
    add: 'brand_shop:product:team_course|add'
  })
  constructor(
    private shopApi: ShopApi,
    private courseApi: CourseApi,
    private shopTeamCourseApi: ShopTeamCourseApi,
    private authService: AuthService,
    private redirectService: RedirectService
  ) {
    this.state$ = new State({
      teamCourseList: []
    })
  }

  getList(params: GetTeamBrandCourseListInput) {
    return this.shopTeamCourseApi.getTeamCourseList(params).pipe(
      tap(res => {
        res = this.authService.filter(res)
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  getCategoryList() {
    return this.courseApi.getCourseCategoryList({}).pipe(
      map(res => {
        const list = res.list
        return [
          { id: -1, setting_name: '所有课程类型' },
          ...list.map((item: any) => {
            const { id, setting_name } = item
            return {
              id,
              setting_name
            }
          })
        ]
      }),
      tap(state => {
        this.categoryList$.commit(() => state)
      })
    )
  }
  getShopList() {
    return this.shopApi.getShopList().pipe(
      map(res => {
        const shopInfo = res.list
        return [
          { shop_id: -1, shop_name: '所有门店' },
          ...shopInfo.map((item: any) => {
            const { shop_id, shop_name } = item
            return {
              shop_id,
              shop_name
            }
          })
        ]
      }),
      tap(state => {
        this.shopSelectOptions$.commit(() => state)
      })
    )
  }
  initOptions() {
    return forkJoin(this.getShopList(), this.getCategoryList())
  }
  deleteCourse(courseId: string) {
    return this.shopTeamCourseApi.deleteTeamCourse(courseId)
  }
  init(query: any) {
    return forkJoin(this.getList(query))
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.init({ ...to.query })
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.initOptions().subscribe(() => {
      if (to.name === 'brand-product-course-team-list') {
        next({
          name: 'brand-product-course-team-list-brand'
        })
      } else {
        next()
      }
    })
  }
}
