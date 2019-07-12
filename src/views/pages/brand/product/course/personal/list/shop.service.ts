import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { ShopPersonalCourseApi } from '@/api/v1/course/personal/shop'
import { BrandPersonalCourseApi, GetPersonalBrandCourseListInput, SetAvailableInput, CoursePersonalSupportInput } from '@/api/v1/course/personal/brand'
import { tap, pluck } from 'rxjs/operators'
import { State, Computed, Effect } from 'rx-state'
import { forkJoin } from 'rxjs'
import { AuthService } from '@/services/auth.service'
import { MessageService } from '@/services/message.service'

@Injectable()
export class ShopService implements RouteGuard {
  // loading
  loading$ = new State({})
  // 业务状态
  list$ = new State([])
  page$ = new State({})
  dataSource$ = new State([])
  state$: State<any>
  auth$ = this.authService.authMap({
    transfer: 'brand_shop:product:personal_course|transfer'
  })
  constructor(
    private shopPersonalCourseApi: ShopPersonalCourseApi,
    private authService: AuthService,
    private brandPersonalCourseApi: BrandPersonalCourseApi,
    private msg: MessageService
  ) {
    this.state$ = new State({})
  }
  SET_PERSONAL_COURSE_LIST(data: any) {
    this.state$.commit(state => {
      state.personalCourseList = data.list
    })
  }
  upgradePersonalCourseInBrand(res: any) {
    return this.shopPersonalCourseApi.upgradePersonalCourseInBrand(res).pipe(tap(res => {
      this.msg.success({ content: '转入成功！！！' })
    }))
  }
  @Effect()
  getCoursePrice(courseId: string) {
    return this.brandPersonalCourseApi.getCoursePrice(courseId).pipe(tap(res => {
      let dataSource: any[] = []
      res.info.price_gradient.forEach((ele: any) => {
        ele.prices.forEach((item: any) => {
          let sell_prices = res.info.sale_model === 2 ? item.sell_price : `${item.min_sell_price} ~ ${item.max_sell_price}元`
          let sell_range = `${item.min_sale} ~ ${item.max_sale}节`
          dataSource.push({
            sell_prices,
            sell_range,
            ...item
          })
        })
      })
      this.dataSource$.commit(() => dataSource)
    }))
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
