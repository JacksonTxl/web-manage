import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed } from 'rx-state/src'
import { pluck, tap } from 'rxjs/operators'
import { RevenueApi, RevenueChartParams, RevenueDataParams } from '@/api/v1/stat/revenue'
import { forkJoin } from 'rxjs'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class RevenueService {
  list$ = new State([])
  page$ = new State({})

  auth$ = this.authService.authMap({
    add: 'shop:member:member|add',
    export: 'shop:member:member|export'
  })
  constructor(private revenueApi: RevenueApi, private authService: AuthService) {

  }
  // 获取营收统计图信息
  getChart(query: RevenueChartParams) {
    return this.revenueApi.getChart(query).pipe(tap(res => {
      console.log(res)
      // this.state$.commit(state => {
      //   const data = res.info
      //   const chartData: any = []

      //   data.register_chart.forEach((item: any, idx: number) => {
      //     const chartItem = {
      //       date: item.date,
      //       // 访问用户: item.num,
      //       注册用户: data.register_chart[idx].num,
      //       消费用户: data.consume_chart[idx].num,
      //       购买私教: data.personal_chart[idx].num,
      //       消课人数: data.checkin_chart[idx].num
      //     }
      //     chartData.push(chartItem)
      //   })
      //   state.user = chartData
      // })
    }))
  }
  // 列表
  getList(query: RevenueDataParams) {
    return this.revenueApi.getData(query).pipe(tap(res => {
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
