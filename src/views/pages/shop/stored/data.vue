<template>
  <div :class="basic()">
    <st-panel-layout :class="basic('main')">
      <st-panel class="mg-t16" title="云店概览">
        <div slot="actions">
          <span class="st-refresh-btn__date">
            最近更新时间：2019-04-02 12:38
          </span>
        </div>
        <ul :class="basic('header_content')">
          <li v-for="(item, index) in headerInfo" :key="index">
            <img :src="item.icon" />
            <div>
              <div>{{ item.title }}</div>
              <div>{{ item.sum }}</div>
              <div>{{ item.yesterday }}</div>
            </div>
          </li>
        </ul>
      </st-panel>
      <section>
        <!-- 整体看板 -->
        <st-panel class="mg-t16" title="整体看板">
          <div slot="actions">
            <date-picker></date-picker>
          </div>
          <div :class="basic('whole')">
            <div
              :class="[
                basic('whole_item'),
                wholenavIndex === index ? basic('whole_item_active') : ''
              ]"
              v-for="(item, index) in wholeNav"
              :key="index"
              @click="wholenavFun(index, item)"
            >
              <div>
                {{ item.title }}
                <img :src="item.icon" />
              </div>
              <div :class="basic('whole_item_text')">{{ item.num }}</div>
            </div>
          </div>
          <div :class="basic('revenue_trend')">
            <a-row>
              <a-col :span="16">
                <div>
                  <st-t3 style="margin-bottom: 35px; margin-top:32px">
                    {{ wholenavTitle }}
                  </st-t3>
                  <shop-stored-data-line
                    :data="courseDaily"
                  ></shop-stored-data-line>
                </div>
              </a-col>
              <a-col :span="8">
                <div style="width:90%;margin-top: 20px; margin-left: 10%;">
                  <WholeTabls @change="onChangeTabs">
                    <template v-slot:user>
                      <component
                        v-bind:is="wholeNavcom"
                        :data="dataRing"
                        style="width: 100%;"
                        :height="
                          wholeNavcom === 'brand-user-avg-bar' ? '325' : '332'
                        "
                      ></component>
                    </template>
                    <template v-slot:marketing>
                      <component
                        v-bind:is="wholeNavcom"
                        :data="dataRing"
                        style="width: 100%;"
                        :height="
                          wholeNavcom === 'brand-user-avg-bar' ? '325' : '332'
                        "
                      ></component>
                    </template>
                  </WholeTabls>
                </div>
              </a-col>
            </a-row>
          </div>
        </st-panel>
        <!-- 销售分析 类目分析-->
        <div :class="salesCategory()">
          <div :class="salesCategory('sales_box')">
            <a-row>
              <a-col :span="16">
                <st-container class="bg-white" type="2">
                  <st-t3>销售分析</st-t3>
                  <date-picker></date-picker>
                </st-container>
                <div :class="salesCategory('sales_TOP5')">
                  <div style="flex:1">
                    <sales-analysis
                      title="销量TOP5"
                      :salesList="salesList"
                    ></sales-analysis>
                  </div>
                  <div class="hr"></div>
                  <div style="flex:1">
                    <sales-analysis
                      title="营收TOP5"
                      :salesList="salesList"
                    ></sales-analysis>
                  </div>
                </div>
              </a-col>
              <a-col :span="8">
                <div :class="salesCategory('category_box')">
                  <st-container class="bg-white" type="2">
                    <st-t3>类目分析</st-t3>
                    <date-picker></date-picker>
                  </st-container>
                  <div style="margin:0 24px">
                    <st-t3 style="margin-top:32px">类目营收占比</st-t3>
                    <shop-stored-data-revenue-ring
                      :data="dataRingss"
                      :padding="[60, 60, 38, 0]"
                      style="width: 337px;"
                    ></shop-stored-data-revenue-ring>
                  </div>
                </div>
              </a-col>
            </a-row>
          </div>
        </div>
        <!-- 购买次数 消费金额 -->
        <div class="buy-consumption">
          <BuyConsumptionTables @change="onChangeTabs">
            <template v-slot:user>
              <BuyNumber></BuyNumber>
            </template>
            <template v-slot:marketing>
              <BuyNumber></BuyNumber>
            </template>
          </BuyConsumptionTables>
        </div>
      </section>
    </st-panel-layout>
  </div>
</template>
<script>
import IconStoredOrder from '@/assets/img/shop/stored/data/icon-stored-order.png'
import IconStoredTransaction from '@/assets/img/shop/stored/data/icon-stored-transaction.png'
import IconStoredRevenue from '@/assets/img/shop/stored/data/icon-stored-revenue.png'
import IconStoredPassenger from '@/assets/img/shop/stored/data/icon-stored-passenger.png'
import topIconUser from '@/assets/img/shop/stored/data/icon_top_revenue.png'
import topIconOrder from '@/assets/img/shop/stored/data/icon_top_order.png'
import topIconGuest from '@/assets/img/shop/stored/data/icon_top_guest.png'
import topIconMember from '@/assets/img/shop/stored/data/icon_top_member.png'
import ShopStoredDataLine from '@/views/biz-components/stat/shop-stored-data-line'
import WholeTabls from './components#/whole-tabls'
import BuyConsumptionTables from './components#/buy-consumption-tables'
import DatePicker from './components#/date-picker'
import SalesAnalysis from './components#/sales-analysis'
import BuyNumber from './components#/buy-number'
import ShopStoredDataRing from '@/views/biz-components/stat/shop-stored-data-ring'
import ShopStoredDataRevenueRing from '@/views/biz-components/stat/shop-stored-data-revenue-ring'
import BrandUserAvgBar from '@/views/biz-components/stat/brand-user-avg-bar'

export default {
  bem: {
    basic: 'shop-stored-data',
    salesCategory: 'sales-category'
  },
  data() {
    return {
      wholenavTitle: '营收金额(元)',
      wholenavIndex: 0,
      wholeNavcom: 'shop-stored-data-ring',
      headerInfo: [
        {
          icon: topIconUser,
          title: '营收金额(元)',
          sum: '8,233,000',
          yesterday: '昨日:3,897'
        },
        {
          icon: topIconOrder,
          title: '订单数(单)',
          sum: '8,233,000',
          yesterday: '昨日:3,897'
        },
        {
          icon: topIconMember,
          title: '营收金额(元)',
          sum: '8,233,000',
          yesterday: '昨日:3,897'
        },
        {
          icon: topIconGuest,
          title: '客单价(元)',
          sum: '8,233,000',
          yesterday: '昨日:3,897'
        }
      ],
      wholeNav: [
        {
          icon: IconStoredRevenue,
          title: '营收金额(元)',
          num: '1,122'
        },
        {
          icon: IconStoredOrder,
          title: '订单数(单)',
          num: '1,122'
        },
        {
          icon: IconStoredTransaction,
          title: '交易会员数(人)',
          num: '1,122'
        },
        {
          icon: IconStoredPassenger,
          title: '客单价(元)',
          num: '1,122'
        }
      ],
      dataRing: [
        { name: '商家后台', value: '2020.0' },
        { name: '小程序', value: '200' }
      ],
      dataRings: [
        { name: '潜在会员', value: '2020.0' },
        { name: '正式会员', value: '200' }
      ],
      dataRingss: [
        { name: '潜在会员1', value: '2020.0' },
        { name: '潜在会员2', value: '2020.0' },
        { name: '潜在会员3', value: '2020.0' },
        { name: '潜在会员4', value: '2020.0' },
        { name: '正式会员', value: '200' }
      ],
      salesList: {
        title: ['排名', '商品', '销量(件)'],
        data: [
          {
            name: '王颖',
            age: 18,
            sex: '女'
          },
          {
            name: '崔庆',
            age: 18,
            sex: '男'
          },
          {
            name: '崔庆',
            age: 18,
            sex: '男'
          },
          {
            name: '崔庆',
            age: 18,
            sex: '男'
          },
          {
            name: 1,
            age: 1,
            sex: 1
          }
        ]
      },
      courseDaily: [
        {
          date: '12-03',
          总营收: 1
        },
        {
          date: '12-04',
          总营收: 0
        },
        {
          date: '12-08',
          总营收: 0
        },
        {
          date: '12-09',
          总营收: 0
        },
        {
          date: '12-10',
          总营收: 0
        }
      ]
    }
  },
  components: {
    ShopStoredDataLine,
    DatePicker,
    WholeTabls,
    BuyConsumptionTables,
    SalesAnalysis,
    BuyNumber,
    ShopStoredDataRing,
    ShopStoredDataRevenueRing,
    BrandUserAvgBar
  },
  methods: {
    onChangeTabs(query) {
      console.log(query)
    },
    change() {},
    wholenavFun(index, item) {
      this.wholenavIndex = index
      this.wholenavTitle = item.title
      if (index > 1) {
        this.wholeNavcom = 'brand-user-avg-bar'
      } else {
        this.wholeNavcom = 'shop-stored-data-ring'
      }
    }
  }
}
</script>
