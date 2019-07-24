import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed } from 'rx-state/src'
import { pluck, tap } from 'rxjs/operators'
import { StatApi, RecentQuery, Version } from '@/api/v1/stat/brand'
import { forkJoin } from 'rxjs'
import { AuthService } from '@/services/auth.service'

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
export class RevenueService {
  state$: State<SetState>
  top$: Computed<object>
  userFunnel$: Computed<object>
  user$: Computed<object[]>
  avg$: Computed<object[]>
  entry$: Computed<object[]>
  marketing$: Computed<object[]>
  marketingFunnel$: Computed<object[]>
  list$: Computed<object[]>
  page$: Computed<object>

  auth$ = this.authService.authMap({
    add: 'shop:member:member|add',
    import: 'shop:member:member|import',
    tag: 'shop:member:member|tag',
    bindCoach: 'shop:member:member|bind_coach',
    bindSalesman: 'shop:member:member|bind_salesman',
    export: 'shop:member:member|export'
  })
  constructor(private statApi: StatApi, private authService: AuthService) {
    this.state$ = new State({
      top: {},
      userFunnel: [],
      user: [],
      avg: [],
      entry: [],
      marketing: [],
      marketingFunnel: [],
      list: [],
      page: {}
    })
    this.top$ = new Computed(this.state$.pipe(pluck('top')))
    this.userFunnel$ = new Computed(this.state$.pipe(pluck('userFunnel')))
    this.user$ = new Computed(this.state$.pipe(pluck('user')))
    this.avg$ = new Computed(this.state$.pipe(pluck('avg')))
    this.entry$ = new Computed(this.state$.pipe(pluck('entry')))
    this.marketing$ = new Computed(this.state$.pipe(pluck('marketing')))
    this.marketingFunnel$ = new Computed(this.state$.pipe(pluck('marketingFunnel')))
    this.list$ = new Computed(this.state$.pipe(pluck('list')))
    this.page$ = new Computed(this.state$.pipe(pluck('page')))
  }
  getTop() {
    return this.statApi.getTop({ version: 'studio' }).pipe(tap(res => {
      this.state$.commit(state => {
        state.top = res.info
      })
    }))
  }
  getUser(query: RecentQuery) {
    return this.statApi.getUser({ version: 'studio' }, query).pipe(tap(res => {
      this.state$.commit(state => {
        const data = res.info
        const chartData: any = []

        data.register_chart.forEach((item: any, idx: number) => {
          const chartItem = {
            date: item.date,
            // 访问用户: item.num,
            注册用户: data.register_chart[idx].num,
            消费用户: data.consume_chart[idx].num,
            购买私教: data.personal_chart[idx].num,
            消课人数: data.checkin_chart[idx].num
          }
          chartData.push(chartItem)
        })
        state.user = chartData
      })
    }))
  }
  getUserFunnel() {
    return this.statApi.getUserFunnel({ version: 'studio' }).pipe(tap(res => {
      this.state$.commit(state => {
        state.userFunnel = [
          // { name: '访问用户', value: res.info.visit },
          { name: '注册用户', value: res.info.register },
          { name: '消费用户', value: res.info.consume },
          { name: '购买私教', value: res.info.personal },
          { name: '消课人数', value: res.info.checkin }]
      })
    }))
  }
  // 客单价
  getAvg() {
    return this.statApi.getAvg({ version: 'studio' }).pipe(tap(res => {
      this.state$.commit(state => {
        state.avg = [
          { name: '会员卡', value: res.info.member_card_amount },
          { name: '储值卡', value: res.info.deposit_card_amount },
          { name: '团体课', value: res.info.team_course_amount },
          { name: '私教课', value: res.info.personal_course_amount },
          { name: '课程包', value: res.info.package_course_amount }]
      })
    }))
  }
  // 营销分析
  getMarketing(query: RecentQuery) {
    return this.statApi.getMarketing({ version: 'studio' }, query).pipe(tap(res => {
      this.state$.commit(state => {
        const data = res.info
        const chartData: any = []

        data.register_chart.forEach((item: any, idx: number) => {
          const chartItem = {
            date: item.date,
            // 浏览用户: item.num,
            注册用户: data.register_chart[idx].num,
            消费用户: data.consume_chart[idx].num,
            购买私教: data.personal_chart[idx].num
          }
          chartData.push(chartItem)
        })
        state.marketing = chartData
      })
    }))
  }
  // 营销分析
  getMarketingFunnel() {
    return this.statApi.getMarketingFunnel({ version: 'studio' }).pipe(tap(res => {
      this.state$.commit(state => {
        state.marketingFunnel = [
          // { name: '浏览用户', value: res.info.visit },
          { name: '注册用户', value: res.info.register },
          { name: '消费用户', value: res.info.consume },
          { name: '购买私教', value: res.info.personal }]
      })
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
    return forkJoin(this.getTop(), this.getAvg(), this.getUserAll({ recently_day: 7 }), this.getMarketingAll({ recently_day: 7 }), this.getEntry())
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.init().subscribe(res => {
      next()
    })
  }
}
