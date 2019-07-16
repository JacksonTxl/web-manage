<template>
  <st-panel app>
    <div>品牌头部线图</div>
    <div class="d-ib" style="width:140px">
      <brand-simple-line :data="dataSimpleLine"></brand-simple-line>
    </div>
    <div>品牌头部小bar图</div>
    <div class="d-ib" style="width:140px">
      <brand-simple-bar :data="dataSimpleBar"></brand-simple-bar>
    </div>

    <div>前台简单面积图</div>
    <div class="d-ib" style="width:140px">
      <front-simple-area :data="dataSimpleArea"></front-simple-area>
    </div>

    <div>营销分析面积图</div>
    <div style="width:500px" class="d-ib">
      <brand-revenue-area v-if="show" :data="dataRA"></brand-revenue-area>
    </div>
    <div>客单价柱状图</div>
    <div style="width:400px" class="d-ib">
      <brand-user-avg-bar v-if="show" :data="data2"></brand-user-avg-bar>
    </div>用户活跃分析环形图
    <div style="width:400px" class="d-ib">
      <brand-user-ring v-if="show" :data="data1"></brand-user-ring>
    </div>
    <div>营收趋势多线图</div>
    <div style="width:500px">
      <shop-revenue-line v-if="show" :data="data4"></shop-revenue-line>
    </div>
    <div>营收结构环形图</div>
    <div style="width:400px">
      <shop-revenue-ring v-if="show" :data="data3"></shop-revenue-ring>
    </div>

    <div>上课分析多线图</div>

    <div style="width:550px">
      <shop-course-facet-bar :data="dataFacet"></shop-course-facet-bar>
    </div>
    <div>售课消课柱状图</div>
    <div style="width:500px" class="d-ib">
      <shop-course-bar v-if="show" :data="data6"></shop-course-bar>
    </div>
    <div>入场人数线图</div>
    <div style="width:500px" class="d-ib">
      <shop-entry-line v-if="show" :data="data8"></shop-entry-line>
    </div>
    <div>入场人数横向柱状图</div>
    <div style="width:700px" class="d-ib">
      <shop-entry-bar v-if="show" :data="data7"></shop-entry-bar>
    </div>
    <div>
      人群分析多线图
      <crowd-line :data="data11"></crowd-line>
    </div>
    <div>营销仪表盘</div>
    <div>
      <marketing-dashboard :data="data9"></marketing-dashboard>
    </div>
    <div>营销用于画像</div>
    <div style="width:500px" class="d-ib">
      <marketing-personal :data="data10"></marketing-personal>
    </div>
  </st-panel>
</template>

<script>
import BrandSimpleLine from '@/views/biz-components/stat/brand-simple-line'
import BrandSimpleBar from '@/views/biz-components/stat/brand-simple-bar'
import BrandRevenueArea from '@/views/biz-components/stat/brand-revenue-area'
import BrandUserRing from '@/views/biz-components/stat/brand-user-ring'
import BrandUserAvgBar from '@/views/biz-components/stat/brand-user-avg-bar'

import ShopRevenueRing from '@/views/biz-components/stat/shop-revenue-ring'
import ShopRevenueLine from '@/views/biz-components/stat/shop-revenue-line'
import ShopCourseBar from '@/views/biz-components/stat/shop-course-bar'
import ShopEntryBar from '@/views/biz-components/stat/shop-entry-bar'
import ShopEntryLine from '@/views/biz-components/stat/shop-entry-line'
import ShopCourseFacetBar from '@/views/biz-components/stat/shop-course-facet-bar'
import CrowdLine from '@/views/biz-components/stat/crowd-line'

import FrontSimpleArea from '@/views/biz-components/stat/front-simple-area'

import MarketingDashboard from '@/views/biz-components/stat/marketing-dashboard'
import MarketingPersonal from '@/views/biz-components/stat/marketing-personal'

export default {
  components: {
    BrandRevenueArea,
    BrandUserRing,
    BrandUserAvgBar,
    ShopRevenueRing,
    ShopRevenueLine,
    ShopCourseBar,
    ShopEntryBar,
    ShopEntryLine,
    MarketingDashboard,
    MarketingPersonal,
    CrowdLine,
    BrandSimpleLine,
    FrontSimpleArea,
    BrandSimpleBar,
    ShopCourseFacetBar
  },
  data() {
    return {
      dataRA: [],
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
      dataFacet: [],
      show: true
    }
  },
  methods: {
    onDes() {
      this.show = false
    },
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
      this.dataFacet = [
        {
          group: '总销课',
          团体课: 25,
          私教课: 16
        },
        {
          group: '未销课',
          团体课: 16,
          私教课: 10
        },
        {
          group: '已销课',
          团体课: 12,
          私教课: 1
        }
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
  },
  mounted() {
    // setInterval(() => {
    this.reload()
    // }, 1000)
  }
}
</script>

<style>
.d-ib {
  display: inline-block;
}
</style>
