import { CourseApi } from '@/api/v1/setting/course'
import { ShopApi } from '@/api/v1/shop'
import { Controller, ServiceRoute, Injectable } from 'vue-service-app'
import { State } from 'rx-state'
import { tap, map } from 'rxjs/operators'
import { forkJoin } from 'rxjs'
import { AuthService } from '@/services/auth.service'
import { RedirectService } from '@/services/redirect.service'

@Injectable()
export class ListService implements Controller {
  categoryList$ = new State<any[]>([])
  shopSelectOptions$ = new State<any[]>([])
  authTabs$ = this.authService.getAuthTabs$('brand-product-course-team-list')
  constructor(
    private shopApi: ShopApi,
    private courseApi: CourseApi,
    private authService: AuthService,
    private redirectService: RedirectService
  ) {}
  getCategoryList() {
    return this.courseApi.getCourseCategoryList({}).pipe(
      map(res => {
        const list = res.list
        return [
          { value: -1, label: '全部课程类型' },
          ...list.map((item: any) => {
            const { id, setting_name } = item
            return {
              label: setting_name,
              value: id
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
    return this.shopApi.getShopListForSelect().pipe(
      map(res => {
        const list = res.shops.map((item: any) => {
          return { label: item.shop_name, value: item.id }
        })
        return [{ label: '全部门店', value: -1 }, ...list]
      }),
      tap(state => {
        this.shopSelectOptions$.commit(() => state)
      })
    )
  }
  init() {
    return forkJoin(this.getShopList(), this.getCategoryList())
  }
  redirect(to: ServiceRoute, from: ServiceRoute, next: any) {
    if (to.name === 'brand-product-course-team-list') {
      next({
        name: 'brand-product-course-team-list-brand'
      })
    } else {
      next()
    }
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.init().subscribe(() => {
      this.redirect(to, from, next)
    })
  }
  beforeRouteUpdate(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.redirect(to, from, next)
  }
}
