import { ShopApi } from '@/api/v1/shop'
import { Controller, ServiceRoute, Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap, map } from 'rxjs/operators'
import { forkJoin } from 'rxjs'
import { ShopPersonalCourseApi } from '@/api/v1/course/personal/shop'
import { AuthService } from '@/services/auth.service'
import { MessageService } from '@/services/message.service'
import { CourseApi } from '@/api/v1/special/course'

@Injectable()
export class ListService implements Controller {
  // loading
  loading$ = new State({})
  // 业务状态
  list$ = new State([])
  page$ = new State({})
  categoryList$ = new State<any[]>([])
  priceGradient$ = new State<any[]>([])
  dataSource$ = new State<any[]>([])
  auth$ = this.authService.authMap$({
    add: 'shop:product:personal_course|add'
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
  getCoursePriceList(id: any) {
    return this.shopPersonalCourseApi.getCoursePriceList(id).pipe(
      tap(res => {
        this.priceGradient$.commit(() => res.info.price_gradient)
      }),
      tap(res => {
        let dataSource: any[] = []
        res.info.price_gradient.forEach((ele: any) => {
          ele.prices.forEach((item: any) => {
            let sell_prices =
              res.info.sale_model === 2
                ? item.sell_price
                : `${item.min_sell_price} ~ ${item.max_sell_price}元`
            let sell_range = `${item.min_sale} ~ ${item.max_sale}节`
            dataSource.push({
              sell_prices,
              sell_range,
              ...item
            })
          })
        })
        this.dataSource$.commit(() => dataSource)
      })
    )
  }
  settingCoursePrice(params: any) {
    return this.shopPersonalCourseApi.settingCoursePrice(params).pipe(
      tap(res => {
        this.msg.success({ content: '设置成功' })
      })
    )
  }
  deleteCourse(id: any) {
    return this.shopPersonalCourseApi.deleteCourse(id).pipe(
      tap(res => {
        this.msg.success({ content: '删除成功' })
      })
    )
  }
  initOptions() {
    return forkJoin(this.getCategoryList())
  }
  @Effect()
  getList(params: any) {
    return this.shopPersonalCourseApi.getCourseList(params).pipe(
      tap(res => {
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
