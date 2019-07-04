<template>
  <a-row :class="b()" :gutter="24">
    <a-col :class="bCount()" :lg="18">
      <st-panel title="概况">
        <div slot="actions">
          最近更新时间：2019-04-02 12:38  <st-icon type="switch"></st-icon>
        </div>
        <a-row :class="bCount('title')">
          <a-col :lg="3">
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
          <a-col :lg="6">
            客流量(人)
          </a-col>
        </a-row>
        <a-row class="mg-t24 count1">
          <a-col :class="bCount('date')" :lg="3">
            今日
          </a-col>
          <a-col :class="bCount('count')" :lg="5">
            4,298
          </a-col>
          <a-col :class="bCount('count')" :lg="5">
            10,231
          </a-col>
          <a-col :class="bCount('count')" :lg="5">
            9,231
          </a-col>
          <a-col :class="bCount('count')" :lg="6">
            9,332
          </a-col>
        </a-row>
        <a-row class="mg-t32 count2">
          <a-col  :class="bCount('date')" :lg="3">
              昨日
          </a-col>
          <a-col :class="bCount('count')" :lg="5">
            3,897
          </a-col>
          <a-col :class="bCount('count')" :lg="5">
            9,956
          </a-col>
          <a-col :class="bCount('count')" :lg="5">
            10,056
          </a-col>
          <a-col :class="bCount('count')" :lg="6">
            10,908
          </a-col>
        </a-row>
        <a-row class="mg-t32 count3">
          <a-col  :class="bCount('date')" :lg="3">
            近7日
          </a-col>
          <a-col :class="bCount('count')" :lg="5">
            27,279
          </a-col>
          <a-col :class="bCount('count')" :lg="5">
            69,692
          </a-col>
          <a-col :class="bCount('count')" :lg="5">
            9,600
          </a-col>
          <a-col :class="bCount('count')" :lg="6">
            76,356
          </a-col>
        </a-row>
        <a-row class="mg-t32 count4">
          <a-col  :class="bCount('date')" :lg="3">
            近三十日
          </a-col>
          <a-col :class="bCount('count')" :lg="5">
            109,116
          </a-col>
          <a-col :class="bCount('count')" :lg="5">
            278,768
          </a-col>
          <a-col :class="bCount('count')" :lg="5">
            9,210
          </a-col>
          <a-col :class="bCount('count')" :lg="6">
            305,424
          </a-col>
        </a-row>
      </st-panel>
      <st-panel class="mg-t16" >
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
          <a-col :span="14">
            <st-t3> 营收趋势</st-t3>
            <shop-revenue-line :data="data4"></shop-revenue-line>
          </a-col>
          <a-col :span="10">
            <st-t3>营收结构</st-t3>
            <shop-revenue-ring :data="data3"></shop-revenue-ring>

          </a-col>
        </a-row>
      </st-panel>
      <st-panel class="mg-t16" >
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
            <st-t3>营销漏斗</st-t3>
            <funnel-vertical :data="dataFV"></funnel-vertical>
          </a-col>
          <a-col :span="17">
            <st-t3>新增入会用户</st-t3>
            <shop-add-user  :data="data8"></shop-add-user>
          </a-col>
        </a-row>
      </st-panel>
      <st-panel class="mg-t16" >
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
          <a-col :span="14">
            <st-t3>上课分析</st-t3>
            <shop-course-line v-if="show" :data="data5"></shop-course-line>
          </a-col>
          <a-col :span="10">
            <st-t3>售课消课</st-t3>
            <shop-course-bar v-if="show" :data="data6"></shop-course-bar>
          </a-col>
        </a-row>
      </st-panel>
      <st-panel class="mg-t16" >
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
          <a-col :span="14">
            <st-t3>入场人数</st-t3>
            <shop-entry-line v-if="show" :data="data8"></shop-entry-line>
          </a-col>
          <a-col :span="10">
            <st-t3>入场人数横向柱状图</st-t3>
            <shop-entry-bar v-if="show" :data="data7"></shop-entry-bar>
          </a-col>
        </a-row>
      </st-panel>
    </a-col>
    <a-col :class="b('adv')" :span="6">
      <st-panel app :class="bCount('box')">
        <img width="280px" height="186px" src="https://file.digitaling.com/eImg/uimages/20170814/1502707757253062.jpg" alt="">
      </st-panel>
      <st-container class="bg-white mg-t16" type="2">
        <st-t3>热门营销插件</st-t3>
        <plug-in></plug-in>
        <plug-in></plug-in>
        <plug-in></plug-in>
      </st-container>
      <st-container class="book bg-white mg-t16" type="2">
        <div class="book-img">
          <img src="" alt="">
        </div>

        <div class="book-content  mg-l24">
          <span>2018中国健身行业数据报告</span>
          <a href="javascript:;">¥499</a>
          <st-button ghost pill type="primary" class="mg-t8">免费下载电子版</st-button>
        </div>
      </st-container>
      <st-container class="aiot bg-white mg-t16" type="2">
        <div class="aiot__img">
          <img src="" alt="">
        </div>
        <div class="aiot__content mg-l24">
          <st-t3>多功能人脸识别一体机</st-t3>
          <p>AI技术加持，玩转大数据</p>
        </div>
      </st-container>
      <st-container class="link bg-white mg-t16" type="2">
        <st-t3 class="link__phone">400-962-8988</st-t3>
        <div class="link__time">服务时间：09:00 - 18:00</div>
        <div class="link__qr-code mg-t8">
          <div class="image-box">
            <img class="image" src="#" alt="">
          </div>

          <span>扫码关注三体官方微信公众号</span>
        </div>
      </st-container>
    </a-col>
  </a-row>

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
export default {
  name: 'Dashboard',
  bem: {
    b: 'page-shop-dashboard',
    bCount: 'page-shop-dashboard-count',
    bAdv: 'page-shop-dashboard-adv'
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
    reload() {
      this.dataSimpleBar = {
        name: '会员占比',
        percent: 0.18
      }
      this.dataSimpleLine = [
        { name: '1', value: parseInt(10 * Math.random() * 10) },
        { name: '2', value: parseInt(10 * Math.random() * 10) },
        { name: '3', value: parseInt(10 * Math.random() * 10) },
        { name: '4', value: parseInt(10 * Math.random() * 10) },
        { name: '5', value: parseInt(10 * Math.random() * 10) },
        { name: '6', value: parseInt(10 * Math.random() * 10) },
        { name: '7', value: parseInt(10 * Math.random() * 10) }
      ]
      this.dataSimpleArea = [
        { name: '1', value: parseInt(10 * Math.random() * 10) },
        { name: '2', value: parseInt(10 * Math.random() * 10) },
        { name: '3', value: parseInt(10 * Math.random() * 10) },
        { name: '4', value: parseInt(10 * Math.random() * 10) },
        { name: '5', value: parseInt(10 * Math.random() * 10) }
      ]
      this.dataRA = [
        {
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
      this.dataFV = [{ name: '得到你', value: 400 }, { name: '得到你 laiya', value: 300 }, { name: '得到你 laiya', value: 200 }, { name: '得到你 laiya', value: 100 }]
      this.data1 = [
        { name: '1-3次', value: 20 },
        { name: '2-5次', value: 200 },
        { name: '3-3次', value: 60 },
        { name: '14-3次', value: 90 },
        { name: '14-36次', value: 90 }
      ]
      this.data2 = [
        { name: '会员卡', value: 2500 },
        { name: '储值卡', value: 2000 },
        { name: '团体课', value: 1000 },
        { name: '私教课', value: 2311.26 },
        { name: '课程包', value: 200 }
      ]

      this.data3 = [
        { name: '会员卡', value: 2500 },
        { name: '私教课', value: 2000 },
        { name: '团体课', value: 1000 },
        { name: '储值卡', value: 2311.26 },
        { name: '定金', value: 200 },
        { name: '押金', value: 200 },
        { name: '其他', value: 200 }
      ]
      this.data4 = [
        {
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
      this.data5 = [
        {
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
      this.data6 = [
        { type: '私教课', 售课数: 20, 消课数: 50 },
        { type: '团体课', 售课数: 20, 消课数: 50 }
      ]
      this.data7 = [
        {
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
      this.data8 = [
        {
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
      this.data10 = [
        { name: '水瓶座' },
        { name: '有子女' },
        { name: '男生' },
        { name: '未婚' },
        { name: '北京市' },
        { name: '大专' },
        { name: '00后' }
      ].slice(0, parseInt(Math.random() * 5 + 2))

      this.data11 = [
        {
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
