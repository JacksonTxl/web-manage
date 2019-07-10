<template>
  <div :class="b()" :gutter="24">
    <div :class="bCount()" :lg="18">
      <st-panel title="概况">
        <div slot="actions">
          <!-- 最近更新时间：2019-04-02 12:38 <a :class="bCount('refresh')" href="javascript:viod(0);" @click="refresh"><st-icon type="switch"></st-icon></a> -->
        </div>
        <a-row :class="bCount('title')">
          <a-col :lg="4">
          </a-col>
          <a-col :lg="5">
            新增用户数(人)
            <span :class="[bCount('topIcon'), 'user']"><img :src="topIconUser" /></span>
          </a-col>
          <a-col :lg="5">
            营收额(万元)
            <span :class="[bCount('topIcon'), 'money']"><img :src="topIconMoney" /></span>
          </a-col>
          <a-col :lg="5">
            总消课(节)
            <span :class="[bCount('topIcon'), 'price']"><img :src="topIconPrice" /></span>
          </a-col>
          <a-col :lg="5">
            客流量(人)
            <span :class="[bCount('topIcon'), 'flow']"><img :src="topIconFlow" /></span>
          </a-col>
        </a-row>
        <a-row class="mg-t24 count1">
          <a-col :class="bCount('date')" style="line-height:40px;" :lg="4">
            今日
          </a-col>
          <a-col :class="bCount('count')" class="font-number" :lg="5">
            {{beMemberNum.today||0}}
          </a-col>
          <a-col :class="bCount('count')" class="font-number" :lg="5">
            {{revenueAmount.today||0}}
          </a-col>
          <a-col :class="bCount('count')" class="font-number" :lg="5">
            {{courseCheckInNum.today||0}}
          </a-col>
          <a-col :class="bCount('count')" class="font-number" :lg="5">
            {{passengerFlow.today||0}}
          </a-col>
        </a-row>
        <a-row class="mg-t32 count2">
          <a-col :class="bCount('date')" :lg="4">
            昨日
          </a-col>
          <a-col :class="bCount('count')" class="font-number"  :lg="5">
            {{beMemberNum.yesterday}}
          </a-col>
          <a-col :class="bCount('count')" class="font-number" :lg="5">
            {{revenueAmount.yesterday}}
          </a-col>
          <a-col :class="bCount('count')" class="font-number" :lg="5">
            {{courseCheckInNum.yesterday}}
          </a-col>
          <a-col :class="bCount('count')" class="font-number" :lg="5">
            {{passengerFlow.yesterday}}
          </a-col>
        </a-row>
        <a-row class="mg-t32 count3">
          <a-col :class="bCount('date')" :lg="4">
            近7日
          </a-col>
          <a-col :class="bCount('count')" class="font-number" :lg="5">
            {{beMemberNum.nearly_seven_days}}
          </a-col>
          <a-col :class="bCount('count')" class="font-number" :lg="5">
            {{revenueAmount.nearly_seven_days}}
          </a-col>
          <a-col :class="bCount('count')" class="font-number" :lg="5">
            {{courseCheckInNum.nearly_seven_days}}
          </a-col>
          <a-col :class="bCount('count')" class="font-number" :lg="5">
            {{passengerFlow.nearly_seven_days}}
          </a-col>
        </a-row>
        <a-row class="mg-t32 count4">
          <a-col :class="bCount('date')" :lg="4">
            近三十日
          </a-col>
          <a-col :class="bCount('count')" class="font-number" :lg="5">
            {{beMemberNum.nearly_thirty_days}}
          </a-col>
          <a-col :class="bCount('count')" class="font-number" :lg="5">
            {{revenueAmount.nearly_thirty_days}}
          </a-col>
          <a-col :class="bCount('count')" class="font-number" :lg="5">
            {{courseCheckInNum.nearly_thirty_days}}
          </a-col>
          <a-col :class="bCount('count')" class="font-number" :lg="5">
            {{passengerFlow.nearly_thirty_days}}
          </a-col>
        </a-row>
      </st-panel>
      <st-panel class="mg-t16">
        <div slot="title">
          <recent-radio-group @change="revenueRecentChange"></recent-radio-group>
        </div>
        <a-row>
          <a-col :span="14">
            <st-t3> 营收趋势</st-t3>
            <p :class="bCount('amount')">合计：<span class="font-number">{{revenueSummary.length?revenueSummary[7].value:''}}</span>元</p>
            <shop-revenue-line :data="revenueDaily"></shop-revenue-line>
          </a-col>
          <a-col :span="10">
            <st-t3 style="margin-bottom:40px;">营收结构</st-t3>
            <shop-revenue-ring :data="revenueSummary"></shop-revenue-ring>

          </a-col>
        </a-row>
      </st-panel>
      <st-panel class="mg-t16">
        <div slot="title">
          <recent-radio-group @change="newMemberRecentChange"></recent-radio-group>
        </div>
        <a-row>
          <a-col :span="7">
            <a-dropdown>
              <a href="javascript:;">
                <st-t3>
                  {{memberType==='member'?'营销转化':'用户转化'}}
                  <st-icon type="dropdown" :class="b('dropdown')" color="rgba(0,0,0,.15)"></st-icon>
                </st-t3>
              </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a href="javascript:;" @click="switchMember('member')">营销转化</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;" @click="switchMember('marketing')">用户转化</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>

            <funnel-vertical v-if="memberType==='member'" style="margin-top:24px;" :height="320" :data="member.member"></funnel-vertical>
            <funnel-vertical v-if="memberType==='marketing'" style="margin-top:24px;" :height="320" :data="member.marketing"></funnel-vertical>
          </a-col>
          <a-col :offset="1" :span="16">
            <st-t3 style="margin-bottom:24px;">新增入会用户</st-t3>
            <shop-add-user :height="320" :data="newMember"></shop-add-user>
          </a-col>
        </a-row>
      </st-panel>
      <st-panel class="mg-t16">
        <div slot="title">
          <recent-radio-group @change="courseRecentChange"></recent-radio-group>
        </div>
        <a-row>
          <a-col :span="13">
            <st-t3 style="margin-bottom:24px;">上课分析</st-t3>
            <shop-course-line v-if="show" :data="courseDaily"></shop-course-line>
          </a-col>
          <a-col :span="10" :offset="1">
            <st-t3 style="margin-bottom:24px;">售课消课</st-t3>
            <shop-course-bar v-if="show" :data="courseSummary"></shop-course-bar>
          </a-col>
        </a-row>
      </st-panel>
      <st-panel class="mg-t16">
        <div slot="title">
          <recent-radio-group @change="inoutRecentChange"></recent-radio-group>
        </div>
        <a-row>
          <a-col :span="13">
            <st-t3 style="margin-bottom:24px;">入场人数</st-t3>
            <shop-entry-line v-if="show" :height="190" :data="inoutNum"></shop-entry-line>
          </a-col>
          <a-col :span="10" :offset="1">
            <st-t3 style="margin-bottom:24px;">入场人数横向柱状图</st-t3>
            <shop-entry-bar v-if="show" :data="inoutTime"></shop-entry-bar>
          </a-col>
        </a-row>
      </st-panel>
    </div>
    <div :class="b('adv')" :span="6">
      <sidebar-component></sidebar-component>
    </div>
  </div>

</template>
<script>
import topIconUser from '@/assets/img/shop/dashboard/top_icon_user.png'
import topIconMoney from '@/assets/img/shop/dashboard/top_icon_money.png'
import topIconPrice from '@/assets/img/shop/dashboard/top_icon_price.png'
import topIconFlow from '@/assets/img/shop/dashboard/top_icon_flow.png'
import FunnelVertical from '@/views/biz-components/chart/funnel-vertical'
import ShopRevenueRing from '@/views/biz-components/stat/shop-revenue-ring'
import ShopRevenueLine from '@/views/biz-components/stat/shop-revenue-line'
import ShopCourseLine from '@/views/biz-components/stat/shop-course-line'
import ShopAddUser from '@/views/biz-components/stat/shop-add-user'
import ShopCourseBar from '@/views/biz-components/stat/shop-course-bar'
import ShopEntryBar from '@/views/biz-components/stat/shop-entry-bar'
import ShopEntryLine from '@/views/biz-components/stat/shop-entry-line'
import CrowdLine from '@/views/biz-components/stat/crowd-line'
import SidebarComponent from './sidebar.component'
import RecentRadioGroup from './recent-radio-group'
import {
  ClubComponentService
} from './club.component.service'
export default {
  name: 'ClubComponent',
  bem: {
    b: 'page-shop-dashboard-club',
    bCount: 'page-shop-dashboard-club-count',
    bAdv: 'page-shop-dashboard-club-adv'
  },
  serviceInject() {
    return {
      clubComponentService: ClubComponentService
    }
  },
  rxState() {
    return {
      top: this.clubComponentService.top$,
      revenueDaily: this.clubComponentService.revenueDaily$,
      revenueSummary: this.clubComponentService.revenueSummary$,
      courseDaily: this.clubComponentService.courseDaily$,
      courseSummary: this.clubComponentService.courseSummary$,
      inoutNum: this.clubComponentService.inoutNum$,
      inoutTime: this.clubComponentService.inoutTime$,
      member: this.clubComponentService.member$,
      newMember: this.clubComponentService.newMember$
    }
  },
  computed: {
    revenueAmount() {
      return this.top.revenue_amount
    },
    courseCheckInNum() {
      return this.top.course_checkin_num
    },
    passengerFlow() {
      return this.top.passenger_flow
    },
    beMemberNum() {
      return this.top.be_member_num
    }
  },
  data() {
    return {
      topIconUser: topIconUser,
      topIconMoney: topIconMoney,
      topIconPrice: topIconPrice,
      topIconFlow: topIconFlow,
      inoutRecent: '7',
      courseRecent: '7',
      revenueRecent: '7',
      memberType: 'member',
      gutter: 24,
      show: true
    }
  },
  created() {
    this.getInit()
  },
  components: {
    ShopRevenueRing,
    ShopRevenueLine,
    ShopCourseLine,
    ShopCourseBar,
    ShopEntryBar,
    ShopEntryLine,
    FunnelVertical,
    ShopAddUser,
    SidebarComponent,
    RecentRadioGroup
  },
  methods: {
    inoutRecentChange(query) {
      this.clubComponentService.getInout(query).subscribe()
    },
    courseRecentChange(query) {
      this.clubComponentService.getCourse(query).subscribe()
    },
    newMemberRecentChange(query) {
      this.clubComponentService.getNewMember(query).subscribe()
    },
    revenueRecentChange(query) {
      this.clubComponentService.getRevenue(query).subscribe()
    },
    switchMember(memberType) {
      this.memberType = memberType
    },
    getInit() {
      this.clubComponentService.init().subscribe()
    },
    refresh() {
      // 5分钟间隔限制
    }
  }
}

</script>
