import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state/src'
import { pluck, tap } from 'rxjs/operators'
import {
  CourseApi,
  CourseChartParams,
  CourseDataParams
} from '@/api/v1/stat/course'
import { forkJoin } from 'rxjs'
import { AuthService } from '@/services/auth.service'
import { UserService } from '@/services/user.service'
@Injectable()
export class CourseService {
  soldChartData$ = new State<object[]>([])
  CheckInChartData$ = new State<object[]>([])
  notCheckInChartData$ = new State<object[]>([])
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})

  auth$ = this.authService.authMap$({
    export: 'brand_shop:stat:order_reports|batch_export'
  })
  constructor(
    private api: CourseApi,
    private authService: AuthService,
    private userService: UserService
  ) {}
  // 获取营收统计图信息
  getChart(query: CourseChartParams) {
    return this.api.getChart(query).pipe(
      tap(res => {
        const data = res.info
        const chartData: any = []
        let chartRing: any = []
        const member_card = this.userService.c('member_card')
        data.advance_fee.items.forEach((item: any, idx: number) => {
          const chartItem: any = {
            date: item.date,
            私教课: data.personal_course.items[idx].amount,
            团体课: data.team_course.items[idx].amount,
            课程包: data.package_course.items[idx].amount,
            云店: data.shop.items[idx].amount,
            其它: data.other.items[idx].amount
            // 储值卡: data.deposit_card.items[idx].amount,
            // 定金: data.advance_fee.items[idx].amount,
            // 押金: data.cash_pledge.items[idx].amount,
          }
          chartItem[member_card] = data.member_card.items[idx].amount
          chartData.push(chartItem)
        })
        chartRing = [
          { name: member_card, value: data.member_card.total_amount },
          { name: '私教课', value: data.personal_course.total_amount },
          { name: '团体课', value: data.team_course.total_amount },
          { name: '课程包', value: data.package_course.total_amount },
          { name: '云店', value: data.shop.total_amount },
          { name: '其它', value: data.other.total_amount }
        ]
        // { name: '定金', value: data.advance_fee.total_amount },
        // { name: '押金', value: data.cash_pledge.total_amount },
        // { name: '储值卡', value: data.deposit_card.total_amount },
        this.dataRing$.commit(() => chartRing)
      })
    )
  }
  // 列表
  @Effect()
  getList(query: CourseDataParams) {
    return this.api.getData(query).pipe(
      tap(res => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getList(to.meta.query)
  }
}
