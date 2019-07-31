import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state/src'
import { pluck, tap } from 'rxjs/operators'
import { RevenueApi, RevenueChartParams, RevenueDataParams } from '@/api/v1/stat/revenue'
import { forkJoin } from 'rxjs'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class RevenueService {
  loading$ = new State({})
  dataToday$ = new State({})
  dataLine$ = new State([])
  dataRing$ = new State([])
  list$ = new State([])
  page$ = new State({})

  auth$ = this.authService.authMap({
    export: 'brand_shop:stat:revenue_reports|batch_export'
  })
  constructor(private revenueApi: RevenueApi, private authService: AuthService) {

  }
  // 获取营收统计图信息
  getChart(query: RevenueChartParams) {
    return this.revenueApi.getChart(query).pipe(tap(res => {
      const data = res.info
      const chartData: any = []
      let chartRing: any = []

      data.advance_fee.items.forEach((item: any, idx: number) => {
        const chartItem = {
          date: item.date,
          会员卡: data.member_card.items[idx].amount,
          私教课: data.personal_course.items[idx].amount,
          团体课: data.team_course.items[idx].amount,
          储值卡: data.deposit_card.items[idx].amount,
          课程包: data.package_course.items[idx].amount,
          云店: data.shop.items[idx].amount,
          其它: data.other.items[idx].amount

          // 定金: data.advance_fee.items[idx].amount,
          // 押金: data.cash_pledge.items[idx].amount,

        }
        chartData.push(chartItem)
      })
      chartRing = [
        { name: '会员卡', value: data.member_card.total_amount },
        { name: '私教课', value: data.personal_course.total_amount },
        { name: '团体课', value: data.team_course.total_amount },
        { name: '储值卡', value: data.deposit_card.total_amount },
        { name: '课程包', value: data.package_course.total_amount },
        { name: '云店', value: data.shop.total_amount },

        // { name: '定金', value: data.advance_fee.total_amount },
        // { name: '押金', value: data.cash_pledge.total_amount },
        { name: '其它', value: data.other.total_amount }]
      this.dataRing$.commit(() => chartRing)
      this.dataLine$.commit(() => chartData)
    }))
  }
  // 列表
  @Effect()
  getList(query: RevenueDataParams) {
    return this.revenueApi.getData(query).pipe(tap(res => {
      this.list$.commit(() => res.list)
      this.page$.commit(() => res.page)
    }))
  }
  // 获取今日实时数据
  getDataToday(shopId: number) {
    return this.revenueApi.getDataToady(shopId).pipe(tap(res => {
      const data = res.info
      const arr = [{
        label: '总营收(元)',
        value: data.total_amount || 0
      }, {
        label: '会员卡营收(元)',
        value: data.member_card_amount || 0
      }, {
        label: '私教课营收(元)',
        value: data.personal_course_amount || 0
      }, {
        label: '团体课营收(元)',
        value: data.team_course_amount || 0
      }, {
        label: '课程包营收(元)',
        value: data.package_course_amount || 0
      }, {
        label: '云店营收(元)',
        value: data.shop_amount || 0
      }, {
        label: '其它营收(元)',
        value: data.other_amount || 0
      }]
      const obj = {
        data: arr,
        time: data.updated_time
      }
      this.dataToday$.commit(() => obj)
    }))
  }

  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getList(to.meta.query)
  }
}
