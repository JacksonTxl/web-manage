import { Injectable, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state/src'
import { tap } from 'rxjs/operators'
import { StatApi, RecentQuery } from '@/api/v1/stat/brand'
import { forkJoin } from 'rxjs'

@Injectable()
export class StudioService {
  top$ = new State({})
  userFunnel$ = new State([])
  user$ = new State([])
  avg$ = new State([])
  entry$ = new State([])
  marketing$ = new State([])
  marketingFunnel$ = new State([])
  constructor(private statApi: StatApi) {}
  getTop() {
    return this.statApi.getTop({ version: 'studio' }).pipe(tap(res => {
      this.top$.commit(() => res.info)
    }))
  }
  getUser(query: RecentQuery) {
    return this.statApi.getUser({ version: 'studio' }, query).pipe(tap(res => {
      const data = res.info
      const chartData: any = []

      data.register_chart.forEach((item: any, idx: number) => {
        const chartItem = {
          date: item.date,
          注册用户: data.register_chart[idx].num,
          消费用户: data.consume_chart[idx].num,
          购买私教: data.personal_chart[idx].num,
          消课人数: data.checkin_chart[idx].num
        }
        chartData.push(chartItem)
      })
      this.user$.commit(() => chartData)
    }))
  }
  getUserFunnel() {
    return this.statApi.getUserFunnel({ version: 'studio' }).pipe(tap(res => {
      this.userFunnel$.commit(() =>
        [
          { name: '注册用户', value: res.info.register },
          { name: '消费用户', value: res.info.consume },
          { name: '购买私教', value: res.info.personal },
          { name: '消课人数', value: res.info.checkin }
        ]
      )
    }))
  }
  // 客单价
  getAvg() {
    return this.statApi.getAvg({ version: 'studio' }).pipe(tap(res => {
      this.avg$.commit(() =>
        [
          { name: '会员卡', value: res.info.member_card_amount },
          { name: '储值卡', value: res.info.deposit_card_amount },
          { name: '团体课', value: res.info.team_course_amount },
          { name: '私教课', value: res.info.personal_course_amount },
          { name: '课程包', value: res.info.package_course_amount }
        ]
      )
    }))
  }
  // 营销分析
  getMarketing(query: RecentQuery) {
    return this.statApi.getMarketing({ version: 'studio' }, query).pipe(tap(res => {
      const data = res.info
      const chartData: any = []

      data.register_chart.forEach((item: any, idx: number) => {
        const chartItem = {
          date: item.date,
          注册用户: data.register_chart[idx].num,
          消费用户: data.consume_chart[idx].num,
          购买私教: data.personal_chart[idx].num
        }
        chartData.push(chartItem)
      })
      this.marketing$.commit(() => chartData)
    }))
  }
  // 营销分析
  getMarketingFunnel() {
    return this.statApi.getMarketingFunnel({ version: 'studio' }).pipe(tap(res => {
      this.marketingFunnel$.commit(() =>
        [
          { name: '注册用户', value: res.info.register },
          { name: '消费用户', value: res.info.consume },
          { name: '购买私教', value: res.info.personal }
        ]
      )
    }))
  }
  getUserAll(query: RecentQuery) {
    return forkJoin(this.getUser(query), this.getUserFunnel())
  }
  getMarketingAll(query: RecentQuery) {
    return forkJoin(this.getMarketing(query), this.getMarketingFunnel())
  }
  getEntry() {
    return this.statApi.getEntry({ version: 'studio' }).pipe(tap(res => {
      this.entry$.commit(() =>
        [
          { name: '0次百分比', value: res.info.level_0_num },
          { name: '1-3次人数', value: res.info.level_1_num },
          { name: '4-5次人数', value: res.info.level_2_num },
          { name: '6-10次人数', value: res.info.level_3_num },
          { name: '11-15次人数', value: res.info.level_4_num },
          { name: '16+次人数', value: res.info.level_5_num }
        ]
      )
    }))
  }
  init() {
    return forkJoin(this.getTop(), this.getAvg(), this.getUserAll({ recently_day: 7 }), this.getMarketingAll({ recently_day: 7 }), this.getEntry())
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.init().subscribe(res => {
      next()
    })
  }
}
