import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed } from 'rx-state/src'
import { pluck, tap } from 'rxjs/operators'
import {
  OverviewApi,
  Version,
  RevenueParams
} from '@/api/v1/stat/overview/shop'
import { forkJoin } from 'rxjs'

@Injectable()
export class StudioService implements RouteGuard {
  top$ = new State({
    revenue_amount: {},
    course_checkin_num: {},
    passenger_flow: {},
    be_member_num: {}
  })
  revenueDaily$ = new State([])
  revenueSummary$ = new State([])
  revenueSum$ = new State('')
  courseDaily$ = new State([])
  courseSummary$ = new State([])
  inoutNum$ = new State([])
  inoutTime$ = new State([])
  member$ = new State({})
  newMember$ = new State([])

  constructor(private overviewApi: OverviewApi) {}
  getTop(query: Version) {
    return this.overviewApi.getTop(query).pipe(
      tap(res => {
        this.top$.commit(() => res.info)
      })
    )
  }
  getRevenue(params: RevenueParams) {
    return this.overviewApi.getRevenue(params).pipe(
      tap(res => {
        const data = res.info
        let lineData: any = []
        this.revenueSummary$.commit(() => [
          { name: '会员卡', value: data.summary.member_card_amount },
          { name: '私教课', value: data.summary.personal_course_amount },
          { name: '团体课', value: data.summary.team_course_amount },
          { name: '课程包', value: data.summary.package_course_amount },
          { name: '云店', value: data.summary.shop_amount },
          { name: '其他', value: data.summary.other_amount }
        ])
        this.revenueSum$.commit(() => data.summary.total_amount)
        for (let key in data.daily.member_card_amount) {
          let chartItem = {
            date: key,
            会员卡: Number(data.daily.member_card_amount[key]),
            私教课: Number(data.daily.personal_course_amount[key]),
            团体课: Number(data.daily.team_course_amount[key]),
            课程包: Number(data.daily.package_course_amount[key]),
            云店: Number(data.daily.shop_amount[key]),
            其他: Number(data.daily.other_amount[key]),
            总营收: Number(data.daily.total_amount[key])
          }
          lineData.push(chartItem)
        }
        console.log('营收', lineData)
        this.revenueDaily$.commit(() => lineData)
      })
    )
  }
  getCourse(params: RevenueParams) {
    return this.overviewApi.getCourse(params).pipe(
      tap(res => {
        const data = res.info
        let lineData: any = []
        // courseSummary = [
        //   { type: '私教课', 售课数: data.summary.sale_personal_num, 消课数: data.summary.personal_checkin_num },
        //   { type: '团体课', 售课数: data.summary.sale_team_num, 消课数: data.summary.team_checkin_num },
        //   { type: '合计', 售课数: data.summary.sale_total_num, 消课数: data.summary.checkin_total_num }
        // ]
        this.courseSummary$.commit(() => [
          {
            group: '未消课',
            团体课: data.summary.team_uncheckin_num,
            私教课: data.summary.personal_uncheckin_num
          },
          {
            group: '总消课',
            团体课: data.summary.team_checkin_num,
            私教课: data.summary.personal_checkin_num
          },
          {
            group: '总售课',
            团体课: data.summary.sale_team_num,
            私教课: data.summary.sale_personal_num
          }
        ])
        for (let key in data.daily.personal_reserved_num) {
          let chartItem = {
            date: key,
            私教课预约人数: data.daily.personal_reserved_num[key],
            私教课签到人数: data.daily.personal_checkin_num[key],
            团体课可预约人数: data.daily.team_can_reserve_num[key],
            团体课预约人数: data.daily.team_reserved_num[key],
            团体课签到人数: data.daily.team_sigin_num[key]
          }
          lineData.push(chartItem)
        }
        console.log(lineData)
        this.courseDaily$.commit(() => lineData)
      })
    )
  }
  getInout(params: RevenueParams) {
    return this.overviewApi.getInout(params).pipe(
      tap(res => {
        const data = res
        let lineData: any = []
        for (let key in data.inout_num) {
          let chartItem = {
            date: key,
            value: data.inout_num[key]
          }
          lineData.push(chartItem)
        }
        this.inoutNum$.commit(() => lineData)
        this.inoutTime$.commit(() => [
          {
            name: '08:00之前',
            value: data.inout_time.level0_num
          },
          {
            name: '08:00~12:00',
            value: data.inout_time.level1_num
          },
          {
            name: '12:00~16:00',
            value: data.inout_time.level2_num
          },
          {
            name: '16:00~20:00',
            value: data.inout_time.level3_num
          },
          {
            name: '20:00~24:00',
            value: data.inout_time.level4_num
          }
        ])
      })
    )
  }
  getMember(query: Version) {
    return this.overviewApi.getMember(query).pipe(
      tap(res => {
        const data = res.info
        this.member$.commit(() => {
          return {
            member: [
              { name: '消费用户', value: data.member.consume_num },
              { name: '购买私教', value: data.member.buy_person_course_num },
              {
                name: '私教消课',
                value: data.member.personal_course_checkin_num
              }
            ],
            marketing: [
              { name: '消费用户', value: data.marketing.consume_num },
              { name: '购买私教', value: data.marketing.buy_person_course_num },
              {
                name: '私教消课',
                value: data.marketing.personal_course_checkin_num
              }
            ]
          }
        })
      })
    )
  }
  getBuyCourse(params: RevenueParams) {
    return this.overviewApi.getBuyCourse(params).pipe(
      tap(res => {
        const data = res.info.today_buy_person_course_num
        let lineData: any = []
        for (let key in data) {
          let chartItem = {
            date: key,
            value: data[key]
          }
          lineData.push(chartItem)
        }
        this.newMember$.commit(() => lineData)
      })
    )
  }
  init() {
    return forkJoin(
      this.getTop({ version: 'studio' }),
      this.getRevenue({ recently_day: 7 }),
      this.getCourse({ recently_day: 7 }),
      this.getInout({ recently_day: 7 }),
      this.getMember({ version: 'studio' }),
      this.getBuyCourse({ recently_day: 7 })
    )
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    return this.init()
  }
}
