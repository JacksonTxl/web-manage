import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed } from 'rx-state/src'
import { pluck, tap } from 'rxjs/operators'
import { OverviewApi, Version } from '@/api/v1/stat/overview/shop'
import { forkJoin } from 'rxjs'

interface SetState{
  top: object,
  revenueDaily: object[],
  revenueSummary: object[],
  courseDaily: object[],
  courseSummary: object[],
  inoutNum: object[],
  inoutTime: object[],
  member: object,
  newMember: object[]
}

@Injectable()
export class ClubComponentService {
  state$: State<SetState>
  top$: Computed<object>
  revenueDaily$: Computed<object>
  revenueSummary$: Computed<object>
  courseDaily$: Computed<object>
  courseSummary$: Computed<object>
  inoutNum$: Computed<object>
  inoutTime$: Computed<object>
  member$: Computed<object>
  newMember$: Computed<object>

  constructor(private overviewApi: OverviewApi) {
    this.state$ = new State({
      top: {},
      revenueDaily: [],
      revenueSummary: [],
      courseDaily: [],
      courseSummary: [],
      inoutNum: [],
      inoutTime: [],
      member: {},
      newMember: []
    })
    this.top$ = new Computed(this.state$.pipe(pluck('top')))
    this.revenueDaily$ = new Computed(this.state$.pipe(pluck('revenueDaily')))
    this.revenueSummary$ = new Computed(this.state$.pipe(pluck('revenueSummary')))
    this.courseDaily$ = new Computed(this.state$.pipe(pluck('courseDaily')))
    this.courseSummary$ = new Computed(this.state$.pipe(pluck('courseSummary')))
    this.inoutNum$ = new Computed(this.state$.pipe(pluck('inoutNum')))
    this.inoutTime$ = new Computed(this.state$.pipe(pluck('inoutTime')))
    this.member$ = new Computed(this.state$.pipe(pluck('member')))
    this.newMember$ = new Computed(this.state$.pipe(pluck('newMember')))
  }
  getTop(query: Version) {
    return this.overviewApi.getTop(query).pipe(tap(res => {
      this.state$.commit(state => {
        state.top = res.info
      })
    }))
  }
  getRevenue() {
    return this.overviewApi.getRevenue().pipe(tap(res => {
      this.state$.commit(state => {
        const data = res.info
        let lineData:any = []
        state.revenueSummary = [
          { name: '会员卡', value: data.summary.member_card_amount },
          { name: '私教课', value: data.summary.personal_course_amount },
          { name: '团体课', value: data.summary.team_course_amount },
          { name: '储值卡', value: data.summary.deposit_card_amount },
          { name: '课程包', value: data.summary.package_course_amount },
          { name: '云店', value: data.summary.shop_amount },
          { name: '其他', value: data.summary.other_amount },
          { name: '总营收', value: data.summary.total_amount }
        ]
        for (let key in data.daily.member_card_amount) {
          let chartItem = {
            date: key,
            会员卡: data.daily.member_card_amount[key],
            私教课: data.daily.personal_course_amount[key],
            团体课: data.daily.team_course_amount[key],
            储值卡: data.daily.deposit_card_amount[key],
            课程包: data.daily.package_course_amount[key],
            云店: data.daily.shop_amount[key],
            其他: data.daily.other_amount[key],
            总营收: data.daily.total_amount[key]
          }
          lineData.push(chartItem)
        }
        state.revenueDaily = lineData
      })
    }))
  }
  getCourse() {
    return this.overviewApi.getCourse().pipe(tap(res => {
      this.state$.commit(state => {
        const data = res.info
        let lineData:any = []
        state.courseSummary = [
          { type: '私教课', 售课数: data.summary.sale_personal_num, 消课数: data.summary.personal_checkin_num },
          { type: '团体课', 售课数: data.summary.sale_team_num, 消课数: data.summary.team_checkin_num },
          { type: '合计', 售课数: data.summary.sale_total_num, 消课数: data.summary.checkin_total_num }
        ]
        for (let key in data.daily.personal_reserved_num) {
          let chartItem = {
            date: key,
            私教课预约人数: data.daily.personal_reserved_num[key],
            私教课签到人数: data.daily.personal_checkin_num[key],
            团体课可预约人数: data.daily.team_can_reserve_num[key],
            团体课预约人数: data.daily.team_reserved_num[key],
            团体课签到人数: data.daily.team_checkin_num[key]
          }
          lineData.push(chartItem)
        }
        console.log(lineData)
        state.courseDaily = lineData
      })
    }))
  }
  getInout() {
    return this.overviewApi.getInout().pipe(tap(res => {
      this.state$.commit(state => {
        const data = res.info
        let lineData:any = []
        for (let key in data.inout_num) {
          let chartItem = {
            date: key,
            value: data.inout_num[key]
          }
          lineData.push(chartItem)
        }
        state.inoutNum = lineData
        state.inoutTime = [
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
        ]
      })
    }))
  }
  getMember(query: Version) {
    return this.overviewApi.getMember(query).pipe(tap(res => {
      this.state$.commit(state => {
        const data = res.info
        state.member = {
          member: [
            { name: '消费人数', value: data.member.consume_num },
            { name: '办理入会人数', value: data.member.member_num },
            { name: '购买私教人数', value: data.member.buy_person_course_num }
          ],
          marketing: [
            { name: '消费人数', value: data.marketing.consume_num },
            { name: '办理入会人数', value: data.marketing.member_num },
            { name: '购买私教人数', value: data.marketing.buy_person_course_num }
          ]
        }
      })
    }))
  }
  getNewMember() {
    return this.overviewApi.getNewMember().pipe(tap(res => {
      this.state$.commit(state => {
        const data = res.info
        let lineData:any = []
        for (let key in data) {
          let chartItem = {
            date: key,
            value: data[key]
          }
          lineData.push(chartItem)
        }
        state.newMember = lineData
      })
    }))
  }
  init() {
    return forkJoin(this.getTop({ version: 'club' }), this.getRevenue(), this.getCourse(), this.getInout(), this.getMember({ version: 'club' }), this.getNewMember())
  }
//   beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
//     this.init().subscribe(res => {
//       next()
//     })
//   }
}