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
    add: 'shop:member:member|add',
    export: 'shop:member:member|export'
  })
  constructor(private orderApi: OrderApi, private authService: AuthService) {

  }
  // 获取营收统计图信息
  getChart(query: OrderChartParams) {
    return this.orderApi.getChart(query).pipe(tap(res => {
      const data = res.info
      const arr = [
        { group: '会员卡', 订单数量: data.member_card.num, 均价: data.member_card.avg },
        { group: '私教课', 订单数量: data.personal_course.num, 均价: data.personal_course.avg },
        { group: '团体课', 订单数量: data.team_course.num, 均价: data.team_course.avg },
        { group: '储值卡', 订单数量: data.deposit_card.num, 均价: data.deposit_card.avg },
        { group: '课程包', 订单数量: data.package_course.num, 均价: data.package_course.avg },
        { group: '云店', 订单数量: data.shop.num, 均价: data.shop.avg }
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
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    return this.getList(to.meta.query)
  }
}
