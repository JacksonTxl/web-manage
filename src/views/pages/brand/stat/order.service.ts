import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state/src'
import { pluck, tap } from 'rxjs/operators'
import { OrderApi, OrderChartParams, OrderDataParams } from '@/api/v1/stat/order'
import { forkJoin } from 'rxjs'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class OrderService {
  chartData$ = new State<object[]>([])
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})

  auth$ = this.authService.authMap({
    export: 'brand_shop:stat:order_reports|batch_export'
  })
  constructor(private orderApi: OrderApi, private authService: AuthService) {

  }
  // 获取营收统计图信息
  getChart(query: OrderChartParams) {
    return this.orderApi.getChart(query).pipe(tap(res => {
      const data = res.info
      const arr = [
        { group: '云店', 成单数量: data.shop.num, 客单价: data.shop.avg },
        { group: '课程包', 成单数量: data.package_course.num, 客单价: data.package_course.avg },
        { group: '储值卡', 成单数量: data.deposit_card.num, 客单价: data.deposit_card.avg },
        { group: '团体课', 成单数量: data.team_course.num, 客单价: data.team_course.avg },
        { group: '私教课', 成单数量: data.personal_course.num, 客单价: data.personal_course.avg },
        { group: '会员卡', 成单数量: data.member_card.num, 客单价: data.member_card.avg }
      ]
      this.chartData$.commit(() => arr)
    }))
  }
  // 列表
  @Effect()
  getList(query: OrderDataParams) {
    return this.orderApi.getData(query).pipe(tap(res => {
      this.list$.commit(() => res.list)
      this.page$.commit(() => res.page)
    }))
  }

  // init() {
  //   return forkJoin(this.getTop(), this.getAvg(), this.getUserAll({ recently_day: 7 }), this.getMarketingAll({ recently_day: 7 }), this.getEntry())
  // }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getList(to.meta.query)
  }
}
