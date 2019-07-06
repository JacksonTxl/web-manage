<template>
  <div :class="b()" :gutter="24">
    <div :class="bCount()" :lg="18">
      <st-panel title="概况">
        <div slot="actions">
          最近更新时间：2019-04-02 12:38 <a :class="bCount('refresh')" href="javascript:viod(0);" @click="refresh"><st-icon type="switch"></st-icon></a>
        </div>
        <a-row :class="bCount('title')">
          <a-col :lg="4">
          </a-col>
          <a-col :lg="5">
            新增用户数(人)
          </a-col>
          <a-col :lg="5">
            营收额(万元)
          </a-col>
          <a-col :lg="5">
            总消课(节)
          </a-col>
          <a-col :lg="5">
            客流量(人)
          </a-col>
        </a-row>
        <a-row class="mg-t24 count1">
          <a-col :class="bCount('date')" style="line-height:40px;" :lg="4">
            今日
          </a-col>
          <a-col :class="bCount('count')" class="font-number" :lg="5">
            {{beMemberNum.today}}
          </a-col>
          <a-col :class="bCount('count')" class="font-number" :lg="5">
            {{revenueAmount.today}}
          </a-col>
          <a-col :class="bCount('count')" class="font-number" :lg="5">
            {{courseCheckInNum.today}}
          </a-col>
          <a-col :class="bCount('count')" class="font-number" :lg="5">
            {{passengerFlow.today}}
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
          <div>
            <a-radio-group defaultValue="a">
              <a-radio-button value="a">今天</a-radio-button>
              <a-radio-button value="b">昨天</a-radio-button>
              <a-radio-button value="c">近30天</a-radio-button>
              <a-radio-button value="d">近90天</a-radio-button>
              <a-radio-button value="d">自定义</a-radio-button>
            </a-radio-group>
          </div>
        </div>
        <a-row>
          <a-col :span="14">
            <st-t3> 营收趋势</st-t3>
            <p :class="bCount('amount')">合计：<span class="font-number">128,123</span>元</p>
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
          <div>
            <a-radio-group defaultValue="a" buttonStyle="solid">
              <a-radio-button value="a">今天</a-radio-button>
              <a-radio-button value="b">昨天</a-radio-button>
              <a-radio-button value="c">近30天</a-radio-button>
              <a-radio-button value="d">近90天</a-radio-button>
              <a-radio-button value="d">自定义</a-radio-button>
            </a-radio-group>
          </div>
        </div>
        <a-row>
          <a-col :span="7">
            <st-t3 style="margin-bottom:24px;">营销漏斗</st-t3>
            <funnel-vertical :height="320" :data="member.member"></funnel-vertical>
          </a-col>
          <a-col :offset="1" :span="16">
            <st-t3 style="margin-bottom:24px;">新增入会用户</st-t3>
            <shop-add-user :height="320" :data="newMember"></shop-add-user>
          </a-col>
        </a-row>
      </st-panel>
      <st-panel class="mg-t16">
        <div slot="title">
          <div>
            <a-radio-group defaultValue="a" buttonStyle="solid">
              <a-radio-button value="a">今天</a-radio-button>
              <a-radio-button value="b">昨天</a-radio-button>
              <a-radio-button value="c">近30天</a-radio-button>
              <a-radio-button value="d">近90天</a-radio-button>
              <a-radio-button value="d">自定义</a-radio-button>
            </a-radio-group>
          </div>
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
          <div>
            <a-radio-group defaultValue="a" buttonStyle="solid">
              <a-radio-button value="a">今天</a-radio-button>
              <a-radio-button value="b">昨天</a-radio-button>
              <a-radio-button value="c">近30天</a-radio-button>
              <a-radio-button value="d">近90天</a-radio-button>
              <a-radio-button value="d">自定义</a-radio-button>
            </a-radio-group>
          </div>
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
      <div :class="bCount('box')">
        <img width="280px" height="186px" src="https://file.digitaling.com/eImg/uimages/20170814/1502707757253062.jpg"
          alt="">
      </div>
      <st-container class="bg-white mg-t16" type="2">
        <st-t3 :class="b('title')">三体AIoT<span>查看更多<a-icon theme="filled" type="right-circle" /></span></st-t3>
        <plug-in></plug-in>
        <plug-in></plug-in>
        <plug-in></plug-in>
      </st-container>
      <st-container class="book bg-white mg-t16" type="2">
        <div class="book-img">
          <img src="" alt="">
        </div>

        <div class="book-content  mg-l24">
          <div class="book-content-t">2018中国健身行业数据报告</div>
          <div class="font-number">¥499</div>
          <st-button ghost pill type="primary" class="mg-t8">免费下载电子版</st-button>
        </div>
      </st-container>
      <st-container class="link bg-white mg-t16" type="2">
        <st-t3 class="link__phone font-number">400-962-8988</st-t3>
        <div class="link__time">服务时间：09:00 - 18:00</div>
        <st-hr></st-hr>
        <div class="link__qr-code">
          <div class="image-box">
            <img class="image" src="#" alt="">
          </div>

          <span class="link__span">扫码关注三体官方微信公众号</span>
        </div>
      </st-container>
    </div>
  </div>

</template>
<script>
import PlugIn from '@/views/pages/brand/dashboard#/plug-in'
import FunnelVertical from '@/views/biz-components/chart/funnel-vertical'
import ShopRevenueRing from '@/views/biz-components/stat/shop-revenue-ring'
import ShopRevenueLine from '@/views/biz-components/stat/shop-revenue-line'
import ShopCourseLine from '@/views/biz-components/stat/shop-course-line'
import ShopAddUser from '@/views/biz-components/stat/shop-add-user'
import ShopCourseBar from '@/views/biz-components/stat/shop-course-bar'
import ShopEntryBar from '@/views/biz-components/stat/shop-entry-bar'
import ShopEntryLine from '@/views/biz-components/stat/shop-entry-line'
import CrowdLine from '@/views/biz-components/stat/crowd-line'
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
      gutter: 24,
      dataRA: [],
      ataFV: [],
      dataSimpleLine: [],
      dataSimpleArea: [],
      dataSimpleBar: {},
      data1: [],
      data2: [],
      data3: [],
      data4: [],
      data5: [],
      data6: [],
      data7: [],
      data8: [],
      data9: {},
      data10: [],
      data11: [],
      show: true
    }
  },
  mounted() {
    this.getInit()
    this.reload()
  },
  components: {
    ShopRevenueRing,
    ShopRevenueLine,
    ShopCourseLine,
    ShopCourseBar,
    ShopEntryBar,
    ShopEntryLine,
    PlugIn,
    FunnelVertical,
    ShopAddUser
  },
  methods: {
    getInit() {
      this.clubComponentService.init().subscribe()
    },
    refresh() {
      // 5分钟间隔限制
    },
    reload() {
      this.dataSimpleBar = {
        name: '会员占比',
        percent: 0.18
      }
      this.dataSimpleLine = [{
        name: '1',
        value: parseInt(10 * Math.random() * 10)
      },
      {
        name: '2',
        value: parseInt(10 * Math.random() * 10)
      },
      {
        name: '3',
        value: parseInt(10 * Math.random() * 10)
      },
      {
        name: '4',
        value: parseInt(10 * Math.random() * 10)
      },
      {
        name: '5',
        value: parseInt(10 * Math.random() * 10)
      },
      {
        name: '6',
        value: parseInt(10 * Math.random() * 10)
      },
      {
        name: '7',
        value: parseInt(10 * Math.random() * 10)
      }
      ]
      this.dataSimpleArea = [{
        name: '1',
        value: parseInt(10 * Math.random() * 10)
      },
      {
        name: '2',
        value: parseInt(10 * Math.random() * 10)
      },
      {
        name: '3',
        value: parseInt(10 * Math.random() * 10)
      },
      {
        name: '4',
        value: parseInt(10 * Math.random() * 10)
      },
      {
        name: '5',
        value: parseInt(10 * Math.random() * 10)
      }
      ]
      this.dataRA = [{
        date: '05-23',
        访问用户: 20 * Math.random() * 10,
        办理入会: 20 * Math.random() * 10,
        消费用户: 20 * Math.random() * 10,
        注册用户: 20 * Math.random() * 10,
        推荐用户: 20 * Math.random() * 10
      },
      {
        date: '05-24',
        访问用户: 20 * Math.random() * 10,
        办理入会: 20 * Math.random() * 10,
        消费用户: 20 * Math.random() * 10,
        注册用户: 20 * Math.random() * 10,
        推荐用户: 20 * Math.random() * 10
      },
      {
        date: '05-25',
        访问用户: 20 * Math.random() * 10,
        办理入会: 20 * Math.random() * 10,
        消费用户: 20 * Math.random() * 10,
        注册用户: 20 * Math.random() * 10,
        推荐用户: 20 * Math.random() * 10
      }
      ]
      this.dataFV = [{
        name: '得到你',
        value: 400
      },
      {
        name: '得到你 laiya',
        value: 300
      },
      {
        name: '得到你 laiya',
        value: 200
      },
      {
        name: '得到你 laiya',
        value: 100
      }
      ]
      this.data1 = [{
        name: '1-3次',
        value: 20
      },
      {
        name: '2-5次',
        value: 200
      },
      {
        name: '3-3次',
        value: 60
      },
      {
        name: '14-3次',
        value: 90
      },
      {
        name: '14-36次',
        value: 90
      }
      ]
      this.data2 = [{
        name: '会员卡',
        value: 2500
      },
      {
        name: '储值卡',
        value: 2000
      },
      {
        name: '团体课',
        value: 1000
      },
      {
        name: '私教课',
        value: 2311.26
      },
      {
        name: '课程包',
        value: 200
      }
      ]

      this.data3 = [{
        name: '会员卡',
        value: 2500
      },
      {
        name: '私教课',
        value: 2000
      },
      {
        name: '团体课',
        value: 1000
      },
      {
        name: '储值卡',
        value: 2311.26
      },
      {
        name: '定金',
        value: 200
      },
      {
        name: '押金',
        value: 200
      },
      {
        name: '其他',
        value: 200
      }
      ]
      this.data4 = [{
        date: '05/27',
        私教课: 25618,
        团体课: 6985,
        储值卡: 25456,
        课程包: 12554,
        会员卡: 11564,
        云店: 12544,
        定金: 1125,
        押金: 4568,
        其它: 456
      },
      {
        date: '05/28',
        私教课: 2568,
        团体课: 6985,
        储值卡: 2546,
        课程包: 12541,
        会员卡: 11564,
        云店: 12254,
        定金: 12125,
        押金: 4568,
        其它: 456
      },
      {
        date: '05/29',
        私教课: 25068,
        团体课: 69815,
        储值卡: 2546,
        课程包: 12524,
        会员卡: 11564,
        云店: 12154,
        定金: 12151,
        押金: 45168,
        其它: 45126
      },
      {
        date: '05/30',
        私教课: 25681,
        团体课: 69851,
        储值卡: 2546,
        课程包: 1254,
        会员卡: 11564,
        云店: 1254,
        定金: 125,
        押金: 4568,
        其它: 456
      },
      {
        date: '05/31',
        私教课: 25681,
        团体课: 69851,
        储值卡: 2546,
        课程包: 1254,
        会员卡: 11564,
        云店: 1254,
        定金: 125,
        押金: 4568,
        其它: 456
      }
      ]
      this.data5 = [{
        date: '05/27',
        私教预约人数: 25618,
        私教签到人数: 6985,
        团体课排课人数: 25456
      },
      {
        date: '05/28',
        私教预约人数: 2568,
        私教签到人数: 6985,
        团体课排课人数: 2546
      },
      {
        date: '05/29',
        私教预约人数: 25068,
        私教签到人数: 69815,
        团体课排课人数: 2546
      }
      ]
      this.data6 = [{
        type: '私教课',
        售课数: 20,
        消课数: 50
      },
      {
        type: '团体课',
        售课数: 20,
        消课数: 50
      }
      ]
      this.data7 = [{
        name: '08:00之前',
        value: 128
      },
      {
        name: '08:00~12:00',
        value: 132
      },
      {
        name: '12:00~18:00',
        value: 100
      },
      {
        name: '18:00~24:00',
        value: 72
      },
      {
        name: '24:00之后',
        value: 148
      }
      ]
      this.data8 = [{
        date: '05-19',
        value: 202 * Math.random() * 10
      },
      {
        date: '05-20',
        value: 111 * Math.random() * 10
      },
      {
        date: '05-21',
        value: 165 * Math.random() * 10
      },
      {
        date: '05-22',
        value: 225 * Math.random() * 10
      }
      ]
      this.data9 = {
        name: '转化率',
        percent: Math.random()
      }
      this.data10 = [{
        name: '水瓶座'
      },
      {
        name: '有子女'
      },
      {
        name: '男生'
      },
      {
        name: '未婚'
      },
      {
        name: '北京市'
      },
      {
        name: '大专'
      },
      {
        name: '00后'
      }
      ].slice(0, parseInt(Math.random() * 5 + 2))

      this.data11 = [{
        date: '05/19',
        入场人数: 1346 * Math.random() * 100,
        领券人数: 1023 * Math.random() * 100,
        交易人数: 940 * Math.random() * 100,
        上课人数: 680 * Math.random() * 100
      },
      {
        date: '05/20',
        入场人数: 1346 * Math.random() * 100,
        领券人数: 1023 * Math.random() * 100,
        交易人数: 940 * Math.random() * 100,
        上课人数: 680 * Math.random() * 100
      },
      {
        date: '05/21',
        入场人数: 1346 * Math.random() * 100,
        领券人数: 1023 * Math.random() * 100,
        交易人数: 940 * Math.random() * 100,
        上课人数: 680 * Math.random() * 100
      },
      {
        date: '05/22',
        入场人数: 1346 * Math.random() * 100,
        领券人数: 1023 * Math.random() * 100,
        交易人数: 940 * Math.random() * 100,
        上课人数: 680 * Math.random() * 100
      },
      {
        date: '05/23',
        入场人数: 1346 * Math.random() * 100,
        领券人数: 1023 * Math.random() * 100,
        交易人数: 940 * Math.random() * 100,
        上课人数: 680 * Math.random() * 100
      }
      ]
    }
  }
}

</script>
