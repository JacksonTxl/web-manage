import { ShopApi } from '@/api/v1/shop'
import { Controller, ServiceRoute, Injectable } from 'vue-service-app'
import { State } from 'rx-state'
import { tap, map } from 'rxjs/operators'
import { forkJoin } from 'rxjs'
import { AuthService } from '@/services/auth.service'
import { CourseApi } from '@/api/v1/special/course'

@Injectable()
export class ListService implements Controller {
  categoryList$ = new State<any[]>([])
  shopSelectOptions$ = new State<any[]>([])
  authTabs$ = this.authService.getAuthTabs$(
    'brand-product-course-personal-list'
  )
  constructor(
    private shopApi: ShopApi,
    private courseApi: CourseApi,
    private authService: AuthService
  ) {}
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
    return this.shopApi.getShopListForSelect().pipe(
      map(res => {
        const list = res.shops
        return [{ id: -1, shop_name: '所有门店' }, ...list]
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
    if (to.name === 'brand-product-course-personal-list') {
      next({
        name: 'brand-product-course-personal-list-brand'
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
