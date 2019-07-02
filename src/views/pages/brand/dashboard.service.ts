import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed } from 'rx-state/src'
import { pluck, tap } from 'rxjs/operators'
import { StatApi } from '@/api/v1/stat/brand'
import { forkJoin } from 'rxjs'

interface SetState{
  top: object,
  userFunnel: object[],
  user: object[],
  avg: object[],
  entry: object[],
  marketing: object[],
  marketingFunnel: object[]
}

@Injectable()
export class DashboardService {
  state$: State<SetState>
  top$: Computed<object>
  userFunnel$: Computed<object>
  user$: Computed<object[]>
  avg$: Computed<object[]>
  entry$: Computed<object[]>
  marketing$: Computed<object[]>
  marketingFunnel$: Computed<object[]>
  constructor(private statApi: StatApi) {
    this.state$ = new State({
      top: {},
      userFunnel: [],
      user: [],
      avg: [],
      entry: [],
      marketing: [],
      marketingFunnel: []
    })
    this.top$ = new Computed(this.state$.pipe(pluck('top')))
    this.userFunnel$ = new Computed(this.state$.pipe(pluck('userFunnel')))
    this.user$ = new Computed(this.state$.pipe(pluck('user')))
    this.avg$ = new Computed(this.state$.pipe(pluck('avg')))
    this.entry$ = new Computed(this.state$.pipe(pluck('entry')))
    this.marketing$ = new Computed(this.state$.pipe(pluck('marketing')))
    this.marketingFunnel$ = new Computed(this.state$.pipe(pluck('marketingFunnel')))
  }
  getTop() {
    return this.statApi.getTop().pipe(tap(res => {
      this.state$.commit(state => {
        state.top = res.info
      })
    }))
  }
  getUser() {
    return this.statApi.getUser().pipe(tap(res => {
      this.state$.commit(state => {
        const data = res.info
        const chartData: any = []

        data.visit_chart.forEach((item: any, idx: number) => {
          const chartItem = {
            date: item.date,
            访问用户: item.num,
            注册用户: data.register_chart[idx].num,
            消费用户: data.consume_chart[idx].num,
            办理入会: data.member_chart[idx].num,
            购买私教: data.personal_chart[idx].num
          }
          chartData.push(chartItem)
        })
        state.user = chartData
      })
    }))
  }
  getUserFunnel() {
    return this.statApi.getUserFunnel().pipe(tap(res => {
      this.state$.commit(state => {
        state.userFunnel = [
          { name: '访问用户', value: res.info.visit },
          { name: '注册用户', value: res.info.register },
          { name: '消费用户', value: res.info.consume },
          { name: '办理入会', value: res.info.member },
          { name: '购买私教', value: res.info.personal }]
      })
    }))
  }
  // 客单价
  getAvg() {
    return this.statApi.getAvg().pipe(tap(res => {
      this.state$.commit(state => {
        state.avg = [
          { name: '会员卡客单价', value: res.info.member_card_amount },
          { name: '储值卡单价', value: res.info.deposit_card_amount },
          { name: '团课客单价', value: res.info.team_course_amount },
          { name: '私教课客单价', value: res.info.personal_course_amount },
          { name: '课程包客单价', value: res.info.package_course_amount }]
      })
    }))
  }
  // 营销分析
  getMarketing() {
    return this.statApi.getMarketing().pipe(tap(res => {
      this.state$.commit(state => {
        const data = res.info
        const chartData: any = []

        data.visit_chart.forEach((item: any, idx: number) => {
          const chartItem = {
            date: item.date,
            浏览用户: item.num,
            注册用户: data.register_chart[idx].num,
            消费用户: data.consume_chart[idx].num,
            办理入会: data.member_chart[idx].num
          }
          chartData.push(chartItem)
        })
        state.marketing = chartData
      })
    }))
  }
  // 营销分析
  getMarketingFunnel() {
    return this.statApi.getMarketingFunnel().pipe(tap(res => {
      this.state$.commit(state => {
        state.marketingFunnel = [
          { name: '浏览用户', value: res.info.visit },
          { name: '注册用户', value: res.info.register },
          { name: '消费用户', value: res.info.consume },
          { name: '办理入会', value: res.info.member }]
      })
    }))
  }
  getUserAll() {
    return forkJoin(this.getUser(), this.getUserFunnel())
  }
  getMarketingAll() {
    return forkJoin(this.getMarketing(), this.getMarketingFunnel())
  }
  getEntry() {
    return this.statApi.getEntry().pipe(tap(res => {
      this.state$.commit(state => {
        state.entry = [
          { name: '0次百分比', value: res.info.level_0_num },
          { name: '1-3次人数', value: res.info.level_1_num },
          { name: '4-5次人数', value: res.info.level_2_num },
          { name: '6-10次人数', value: res.info.level_3_num },
          { name: '11-15次人数', value: res.info.level_4_num },
          { name: '16+次人数', value: res.info.level_5_num }]
      })
    }))
  }
  init() {
    // return this.getTop()
    return forkJoin(this.getTop(), this.getAvg(), this.getUser(), this.getUserFunnel(), this.getEntry())
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.init().subscribe(res => {
      next()
    })
  }
}
