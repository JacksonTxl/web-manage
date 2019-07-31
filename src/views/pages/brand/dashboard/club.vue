<template>
  <div :class="b()" >
    <div :class="b('adv')" :span="6">
      <sidebar-component></sidebar-component>
    </div>
    <div :class="b('content')" :span="18">
      <a-row :gutter="16" :class="bCount()">
        <a-col :span="6" :class="bCount('item')">
          <div :class="bCount('box')">
            <count-card title="今日营收额(元)" :count="this.revenue.num" :footer="{label: '近7天日均营收额:', value: Number(this.revenue.avg||'') }" :trend="{isUp: this.revenue.ratio >= 0, rate: this.revenue.ratio+this.revenue.ratio_mark }">
              <template slot="title">
                <st-help-tooltip id="TBCDA001"></st-help-tooltip>
              </template>
              <brand-simple-line :data="this.revenue.chart | lineFilter"></brand-simple-line>
            </count-card>
          </div>
        </a-col>
        <a-col :span="6" :class="bCount('item')">
          <div :class="bCount('box')">
            <count-card title="今日订单数(单)" :count="this.order.num" :footer="{label: '近7天日均订单数:', value: Number(this.order.avg||'') }" :trend="{isUp: this.order.ratio >= 0, rate: this.order.ratio+this.order.ratio_mark }">
              <template slot="title">
                <st-help-tooltip id="TBCDA002"></st-help-tooltip>
              </template>
              <brand-simple-line color="#00B4BC" unit="单" :data="this.order.chart | lineFilter"></brand-simple-line>
            </count-card>
          </div>
        </a-col>
        <a-col :span="6" :class="bCount('item')">
          <div :class="bCount('box')">
            <count-card title="今日客流量(人)" :count="this.visit.num" :footer="{label: '近7天日均客流量:', value: Number(this.visit.avg||'') }">
              <template slot="title">
                <st-help-tooltip id="TBCDA004"></st-help-tooltip>
              </template>
              <brand-simple-line color="#55BFA3" unit="人"  :data="this.visit.chart | lineFilter"></brand-simple-line>
            </count-card>
          </div>
        </a-col>
        <a-col :span="6" :class="bCount('item')">
          <div :class="bCount('box')">
            <count-card  title="用户数(人)" :count="this.user.num" :footer="{label: '近7天日转化会员率:', value: this.user.ratio }">
              <template slot="title">
                <st-help-tooltip id="TBCDA003"></st-help-tooltip>
              </template>
              <brand-simple-bar color="#58CC99" class="mg-t40" :data="this.user.percent | barFilter"></brand-simple-bar>
            </count-card>
          </div>
        </a-col>
      </a-row>
      <a-row :class="b('linebox')" class="mg-t16 bg-white">
        <a-col :span="24">
          <dashboard-tabs @change="onChangeTabs">
            <template v-slot:user>
              <div class="mg-t8 mg-l32 user-chart-box">
                <div class="funnel-vertical">
                  <funnel-vertical  :data="userFunnel"></funnel-vertical>
                </div>
                <div class="revenue-area">
                  <brand-revenue-area  class="user-chart-box__item" :data="userChartData"></brand-revenue-area>
                </div>
              </div>
            </template>
            <template v-slot:marketing>
              <div class="mg-t8 mg-l32 user-chart-box">
                <div class="funnel-vertical">
                  <funnel-vertical  :data="marketingFunnel"></funnel-vertical>
                </div>
                <div class="revenue-area">
                  <brand-revenue-area  :fields="['注册用户','消费用户','办理入会']" class="user-chart-box__item" :data="marketing"></brand-revenue-area>
                </div>
              </div>
            </template>
          </dashboard-tabs>
        </a-col>
      </a-row>
      <a-row :gutter="16" class="mg-t16">
        <a-col :span="12">
          <st-container class="bg-white" type="2">
            <st-t3 style="margin-bottom:20px">客单价</st-t3>
            <brand-user-avg-bar :data="avg" :height="302"></brand-user-avg-bar>

          </st-container>
        </a-col>
        <a-col :span="12">
          <st-container class="bg-white" type="2">
            <st-t3 style="margin-bottom:20px">用户活跃分析</st-t3>
            <brand-user-ring :data="entry" :height="302"></brand-user-ring>
          </st-container>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import BrandSimpleLine from '@/views/biz-components/stat/brand-simple-line'
import BrandSimpleBar from '@/views/biz-components/stat/brand-simple-bar'
import BrandRevenueArea from '@/views/biz-components/stat/brand-revenue-area'
import BrandUserRing from '@/views/biz-components/stat/brand-user-ring'
import BrandUserAvgBar from '@/views/biz-components/stat/brand-user-avg-bar'
import DashboardTabs from './components#/tabs'
import CountCard from './components#/count-card'
import FunnelVertical from '@/views/biz-components/stat/brand-funnel-vertical'
import { ClubService } from './club.service'
import SidebarComponent from './components#/sidebar.component'
export default {
  name: 'Dashboard',
  serviceInject() {
    return {
      clubService: ClubService
    }
  },
  rxState() {
    console.log(this.clubService)
    return {
      top: this.clubService.top$,
      userFunnel: this.clubService.userFunnel$,
      userChartData: this.clubService.user$,
      avg: this.clubService.avg$,
      entry: this.clubService.entry$,
      marketing: this.clubService.marketing$,
      marketingFunnel: this.clubService.marketingFunnel$
    }
  },
  bem: {
    b: 'page-dashboard-club',
    bCount: 'page-dashboard-club-count',
    bAdv: 'page-dashboard-club-adv'
  },
  filters: {
    lineFilter(val) {
      return val.map((item, index) => {
        return {
          name: index,
          value: item.num
        }
      })
    },
    barFilter(val) {
      return {
        name: '会员占比',
        percent: val
      }
    }
  },
  data() {
    return {
    }
  },
  computed: {
    order() {
      return this.top.order
    },
    revenue() {
      return this.top.revenue
    },
    user() {
      return this.top.user
    },
    visit() {
      return this.top.visit
    }
  },
  methods: {
    onChangeTabs(query) {
      this.clubService.getUser(query).subscribe()
      this.clubService.getMarketing(query).subscribe()
    }
  },
  components: {
    DashboardTabs,
    CountCard,
    BrandSimpleBar,
    BrandRevenueArea,
    BrandUserRing,
    BrandSimpleLine,
    BrandUserAvgBar,
    FunnelVertical,
    SidebarComponent

  }
}
</script>

<style lang="scss" scoped>

</style>
