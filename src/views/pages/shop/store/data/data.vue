<template>
  <div :class="basic()">
    <st-panel-layout :class="basic('main')">
      <!-- 云店概览 -->
      <st-panel class="mg-t16" title="云店概览">
        <div slot="actions">
          <st-refresh-btn :action="refresh"></st-refresh-btn>
        </div>
        <ul :class="basic('header-content')">
          <li v-for="(item, index) in headerInfo" :key="index">
            <img :src="item.icon" />
            <div>
              <div>
                {{ item.title }}
              </div>
              <div>
                <i-count-up
                  :endVal="
                    dataProfile.today[headerTitleItem[index]]
                      ? dataProfile.today[headerTitleItem[index]]
                      : 0
                  "
                  :options="{
                    decimalPlaces: (dataProfile.today[headerTitleItem[index]]
                      ? dataProfile.today[headerTitleItem[index]]
                      : 0
                    )
                      .toString()
                      .includes('.')
                      ? 2
                      : 0,
                    decimal: '.'
                  }"
                />
              </div>
              <div>
                昨日:
                <i-count-up
                  :endVal="
                    dataProfile.yesterday[headerTitleItem[index]]
                      ? dataProfile.yesterday[headerTitleItem[index]]
                      : 0
                  "
                  :options="{
                    decimalPlaces: (dataProfile.yesterday[
                      headerTitleItem[index]
                    ]
                      ? dataProfile.yesterday[headerTitleItem[index]]
                      : 0
                    )
                      .toString()
                      .includes('.')
                      ? 2
                      : 0,
                    decimal: '.',
                    prefix: ''
                  }"
                />
              </div>
            </div>
          </li>
        </ul>
      </st-panel>
      <!-- 整体看板 -->
      <section>
        <st-panel class="mg-t16" title="整体看板">
          <div slot="actions">
            <date-picker @timesFn="wholeTimesFn"></date-picker>
          </div>
          <div :class="basic('whole')">
            <div
              :class="[
                basic('whole-item'),
                wholenavIndex === index ? basic('whole-item-active') : ''
              ]"
              v-for="(item, index) in wholeNav"
              :key="index"
              @click="wholenavFun(index, item)"
            >
              <div>
                {{ item.title }}
                <img :src="item.icon" />
              </div>
              <div :class="basic('whole-item-text')">{{ item.num }}</div>
            </div>
          </div>
          <div :class="basic('revenue-trend')">
            <a-row>
              <a-col :span="16">
                <div>
                  <st-t3>
                    {{ wholeNav[wholenavIndex].title }}
                  </st-t3>
                  <shop-store-data-line
                    :data="
                      filterLine(storeBoard, wholeNav[wholenavIndex].title)
                    "
                    :tooltipKey="wholeNav[wholenavIndex].title"
                    :unit="wholeNav[wholenavIndex].title | filterCompany"
                  ></shop-store-data-line>
                </div>
              </a-col>
              <a-col :span="8">
                <div class="ring">
                  <whole-tabls @change="onChangeTabs">
                    <template v-slot:user>
                      <component
                        v-bind:is="wholeNavcom"
                        :guideName="filterOrderMemberTitle()"
                        :unit="wholeNav[wholenavIndex].title | filterCompany"
                        :data="orderMember(storeBoard, 0, 'order')"
                        style="width: 100%;"
                        :height="
                          wholeNavcom === 'brand-user-avg-bar'
                            ? height325
                            : height332
                        "
                      ></component>
                    </template>
                    <template v-slot:marketing>
                      <component
                        v-bind:is="wholeNavcom"
                        :guideName="filterOrderMemberTitle()"
                        :unit="wholeNav[wholenavIndex].title | filterCompany(1)"
                        :data="orderMember(storeBoard, 0, 'member')"
                        style="width: 100%;"
                        :height="
                          wholeNavcom === 'brand-user-avg-bar'
                            ? height325
                            : height332
                        "
                      ></component>
                    </template>
                  </whole-tabls>
                </div>
              </a-col>
            </a-row>
          </div>
        </st-panel>
        <!-- 销售分析 类目分析-->
        <div :class="salesCategory()">
          <div :class="salesCategory('sales-box')">
            <a-row>
              <a-col :span="16">
                <st-container class="bg-white" type="2">
                  <st-t3>销售分析</st-t3>
                  <date-picker @timesFn="saleTimesFn"></date-picker>
                </st-container>
                <div :class="salesCategory('sales-TOP5')">
                  <a-col :span="12">
                    <div style="flex:1">
                      <sales-analysis
                        title="销量TOP5"
                        :salesTitle="['排名', '商品', '销量(件)']"
                        :salesList="storeSaleList.sales_rank"
                      ></sales-analysis>
                    </div>
                  </a-col>
                  <div class="hr"></div>
                  <a-col :span="12">
                    <div style="flex:1">
                      <sales-analysis
                        title="营收TOP5"
                        :salesTitle="['排名', '商品', '营收(元)']"
                        :salesList="storeSaleList.revenue_rank"
                      ></sales-analysis>
                    </div>
                  </a-col>
                </div>
              </a-col>
              <a-col :span="8">
                <div :class="salesCategory('category-box')">
                  <st-container class="bg-white" type="2">
                    <st-t3>类目分析</st-t3>
                    <date-picker
                      @timesFn="categoryTimesFn"
                      class="date-picker"
                    ></date-picker>
                  </st-container>
                  <div class="category">
                    <st-t3>类目营收占比</st-t3>
                    <shop-store-data-revenue-ring
                      :data="categoryRevenue"
                      :sum="storeCategoryRank.total_revenue"
                      :padding="[60, '50%', 38, 0]"
                      style="width: 100%;"
                    ></shop-store-data-revenue-ring>
                  </div>
                </div>
              </a-col>
            </a-row>
          </div>
        </div>
        <!-- 购买次数 消费金额 -->
        <div class="buy-consumption">
          <buy-consumption-tables
            @change="onChangeTabs"
            @timesFn="userAnalysisTimesFn"
          >
            <template v-slot:user>
              <buy-number :flag="true" :data="storeMemberAnalysis"></buy-number>
            </template>
            <template v-slot:marketing>
              <buy-number
                :flag="false"
                :data="storeMemberAnalysis"
              ></buy-number>
            </template>
          </buy-consumption-tables>
        </div>
      </section>
    </st-panel-layout>
  </div>
</template>
<script>
import moment from 'moment'
import ShopStoreDataLine from '@/views/biz-components/stat/shop-store-data-line'
import WholeTabls from './components#/whole-tabls'
import BuyConsumptionTables from './components#/buy-consumption-tables'
import DatePicker from './components#/date-picker'
import SalesAnalysis from './components#/sales-analysis'
import BuyNumber from './components#/buy-number'
import ShopStoreDataRing from '@/views/biz-components/stat/shop-store-data-ring'
import ShopStoreDataRevenueRing from '@/views/biz-components/stat/shop-store-data-revenue-ring'
import BrandUserAvgBar from '@/views/biz-components/stat/shop-store-data-avg-bar'
import { DataService } from './data.service'
import {
  headerInfo,
  wholeNav,
  categoryRevenue,
  headerTitleItem,
  fieldNav
} from './data.config.ts'
export default {
  serviceInject() {
    return {
      dataService: DataService
    }
  },
  rxState() {
    return {
      dataProfile: this.dataService.dataProfile$,
      storeBoard: this.dataService.storeBoard$,
      storeSaleList: this.dataService.storeSaleList$,
      storeCategoryRank: this.dataService.storeCategoryRank$,
      storeMemberAnalysis: this.dataService.storeMemberAnalysis$
    }
  },
  bem: {
    basic: 'shop-store-data',
    salesCategory: 'sales-category'
  },
  data() {
    return {
      height325: 325,
      height332: 332,
      wholenavIndex: 0,
      wholeNavcom: 'shop-store-data-ring',
      headerInfo,
      wholeNav,
      categoryRevenue,
      headerTitleItem,
      fieldNav,
      tabsObjData: {
        choose_type: 1,
        date_type: 1,
        date: null
      }
    }
  },
  components: {
    ShopStoreDataLine,
    DatePicker,
    WholeTabls,
    BuyConsumptionTables,
    SalesAnalysis,
    BuyNumber,
    ShopStoreDataRing,
    ShopStoreDataRevenueRing,
    BrandUserAvgBar
  },
  filters: {
    // 整体看板单位
    filterCompany(value) {
      return value[value.indexOf('(') + 1]
    }
  },
  mounted() {
    this.wholenavFilter(this.storeBoard)
    this.storeCategoryRankFilter(this.storeCategoryRank)
  },
  methods: {
    // 整体看板时间
    wholeTimesFn(value) {
      this.dataService.getStoreBoard(value).subscribe()
    },
    // 销售分析时间
    saleTimesFn(value) {
      this.dataService.getStoreSaleList(value).subscribe()
    },
    // 类目分析时间
    categoryTimesFn(value) {
      this.dataService.getStoreCategoryRank(value).subscribe()
    },
    // 购买次数/消费金额时间
    userAnalysisTimesFn(value) {
      this.tabsObjData.date_type = value.date_type
      this.tabsObjData.date = value.date
      this.dataService.getStoreMemberAnalysis(this.tabsObjData).subscribe()
    },
    // 整体看板订单/会员折线图
    filterLine(data, type) {
      let fieldInfo = ['amount', 'count', 'count', 'price']
      return data[this.fieldNav[this.wholenavIndex]].trend.map(item => {
        return {
          date: item.date,
          amount: item[fieldInfo[this.wholenavIndex]]
        }
      })
    },
    // 整体看板订单/会员
    orderMember(value, flag, that) {
      let fieldInfo = [
        'value',
        'count',
        ['amount', 'count'],
        ['amount', 'count']
      ]
      let filterOrderMemberData = [
        value,
        this.fieldNav,
        this.wholenavIndex,
        that,
        this.wholenavIndex < 2
          ? fieldInfo[this.wholenavIndex]
          : that === 'order'
          ? fieldInfo[this.wholenavIndex][0]
          : fieldInfo[this.wholenavIndex][1]
      ]
      return this.filterOrderMember(...filterOrderMemberData)
    },
    filterOrderMember(value, fieldNav, wholenavIndex, that, type) {
      return value[fieldNav[wholenavIndex]].source[that].map(item => {
        return {
          name: item.type,
          value: item[type]
        }
      })
    },
    // 订单来源/会员身份标题
    filterOrderMemberTitle() {
      let title = ['营收金额(元)', '订单数(单)']
      if (
        title.find(item => item === this.wholeNav[this.wholenavIndex].title)
      ) {
        if (this.wholeNav[this.wholenavIndex].title === title[0]) {
          return '总营收'
        } else {
          return '订单数'
        }
      }
    },
    // 整体看板数据处理
    wholenavFilter(data) {
      let titles = [
        'revenue_amount',
        'order_count',
        'transaction_member',
        'customer_price'
      ]
      let field = ['amount', 'count', 'count', 'price']
      this.wholeNav.forEach((item, index) => {
        let dataInfo = data[titles[index]][field[index]]
        item.num = dataInfo
      })
    },
    // 类目分析数据处理
    storeCategoryRankFilter(data) {
      this.categoryRevenue = data.category_list.map(item => {
        return {
          name: item.category_name,
          value: item.amount
        }
      })
    },

    onChangeTabs(query) {
      this.tabsObjData = Object.assign(this.tabsObjData, query)
      this.tabsObjData.date = this.tabsObjData.date
        ? this.tabsObjData.date
        : moment()
            .endOf('day')
            .format('YYYY-MM-DD') + ''
      this.dataService.getStoreMemberAnalysis(this.tabsObjData).subscribe()
    },
    refresh() {
      return this.dataService.getDataProfile(this.chartTodayShop)
    },
    change() {},
    wholenavFun(index, item) {
      this.wholenavIndex = index
      if (index > 1) {
        this.wholeNavcom = 'brand-user-avg-bar'
      } else {
        this.wholeNavcom = 'shop-store-data-ring'
      }
    }
  }
}
</script>
