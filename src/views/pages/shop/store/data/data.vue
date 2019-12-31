<template>
  <div :class="basic()">
    <st-panel-layout :class="basic('main')">
      <!-- 云店概览 -->
      <st-panel class="mg-t16" title="云店概览">
        <div slot="actions">
          <st-refresh-btn :action="refresh"></st-refresh-btn>
        </div>
        <ul :class="headerContent()">
          <li
            v-for="(item, index) in headerInfo"
            :key="index"
            :class="headerContent('item')"
          >
            <img :src="item.icon" :class="headerContent('item-icon')" />
            <div>
              <div :class="headerContent('item-title')">
                {{ item.title }}
              </div>
              <div :class="headerContent('day-money')">
                <i-count-up
                  :endVal="
                    dataProfile.today[headerTitleItem[index]]
                      ? Number(dataProfile.today[headerTitleItem[index]])
                      : 0
                  "
                  :options="{
                    decimalPlaces: (dataProfile.today[headerTitleItem[index]]
                      ? Number(dataProfile.today[headerTitleItem[index]])
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
              <div :class="headerContent('yesterday-money')">
                昨日:
                <i-count-up
                  :endVal="
                    dataProfile.yesterday[headerTitleItem[index]]
                      ? Number(dataProfile.yesterday[headerTitleItem[index]])
                      : 0
                  "
                  :options="{
                    decimalPlaces: (dataProfile.yesterday[
                      headerTitleItem[index]
                    ]
                      ? Number(dataProfile.yesterday[headerTitleItem[index]])
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
              <div :class="basic('whole-item-title')">
                {{ item.title }}
                <img :class="basic('whole-item-icon')" :src="item.icon" />
              </div>
              <div :class="basic('whole-item-text')">
                <i-count-up
                  :endVal="item.num ? Number(item.num) : 0"
                  :options="{
                    decimalPlaces: (item.num ? item.num : 0)
                      .toString()
                      .includes('.')
                      ? 2
                      : 0,
                    decimal: '.'
                  }"
                />
              </div>
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
                    v-if="
                      filterLine(storeBoard, wholeNav[wholenavIndex].title)
                        .length
                    "
                    :data="
                      filterLine(storeBoard, wholeNav[wholenavIndex].title)
                    "
                    :tooltipKey="wholeNav[wholenavIndex].title"
                    :unit="wholeNav[wholenavIndex].unit"
                  ></shop-store-data-line>
                  <div v-else :class="basic('entry-store-img')">
                    <img
                      :src="inoutNumImg"
                      :class="basic('entry-store-img-line')"
                    />
                  </div>
                </div>
              </a-col>
              <a-col :span="8">
                <div class="ring">
                  <whole-table>
                    <template v-slot:user>
                      <component
                        v-bind:is="wholeNavcom"
                        v-if="orderMember(storeBoard, 0, 'member').length"
                        :unit="wholeNav[wholenavIndex].unit"
                        :data="orderMember(storeBoard, 0, 'order')"
                        :name="filterOrderMemberTitle()"
                        style="width: 100%;"
                        :total="
                          orderMember(storeBoard, 0, 'order').reduce(
                            (item1, item2) => {
                              return Number(item1.value) + Number(item2.value)
                            }
                          )
                        "
                        :height="
                          wholeNavcom === 'brand-user-avg-bar'
                            ? height325
                            : height332
                        "
                      ></component>
                      <div v-else :class="basic('entry-store-img')">
                        <img
                          :src="inoutNumImg"
                          :style="{
                            height:
                              wholeNavcom === 'brand-user-avg-bar'
                                ? '343px'
                                : height332 + 'px'
                          }"
                          class="order-member-inout-img"
                          v-if="wholeNavcom === 'brand-user-avg-bar'"
                        />
                        <img
                          :src="pieImg"
                          v-else
                          class="order-member-pie-img"
                        />
                      </div>
                    </template>
                    <template v-slot:marketing>
                      <component
                        v-bind:is="wholeNavcom"
                        v-if="orderMember(storeBoard, 0, 'member').length"
                        :name="filterOrderMemberTitle()"
                        :unit="wholeNav[wholenavIndex].unit"
                        :data="orderMember(storeBoard, 0, 'member')"
                        :total="
                          orderMember(storeBoard, 0, 'member').reduce(
                            (item1, item2) => {
                              return Number(item1.value) + Number(item2.value)
                            }
                          )
                        "
                        style="width: 100%;"
                        :height="
                          wholeNavcom === 'brand-user-avg-bar'
                            ? height325
                            : height332
                        "
                      ></component>
                      <div v-else :class="basic('entry-store-img')">
                        <img
                          :src="inoutNumImg"
                          :style="{
                            height:
                              wholeNavcom === 'brand-user-avg-bar'
                                ? '343px'
                                : height332 + 'px'
                          }"
                          v-if="wholeNavcom === 'brand-user-avg-bar'"
                          class="order-member-inout-img"
                        />
                        <img
                          :src="pieImg"
                          v-else
                          class="order-member-pie-img"
                        />
                      </div>
                    </template>
                  </whole-table>
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
                    <div>
                      <sales-analysis
                        title="销量TOP5"
                        :salesTitle="['排名', '商品', '销量(件)']"
                        nameLength="6"
                        :salesList="storeSaleList.sales_rank"
                      ></sales-analysis>
                    </div>
                  </a-col>
                  <a-col :span="12" class="hr">
                    <div>
                      <sales-analysis
                        title="营收TOP5"
                        :salesTitle="['排名', '商品', '营收(元)']"
                        nameLength="6"
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
                      :data="storeCategoryRank.category_list"
                      :total="storeCategoryRank.total_revenue"
                      :padding="[60, '50%', 38, 0]"
                      name="总营收"
                      height="280"
                      style="width: 100%;"
                      v-if="storeCategoryRank.category_list.length"
                    ></shop-store-data-revenue-ring>
                    <div :class="basic('entry-pie-img')">
                      <img :src="pieImg" />
                    </div>
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
// 饼图
import pieImg from '@/assets/img/shop/dashboard/pie.png'
// 折线
import inoutNumImg from '@/assets/img/shop/dashboard/inoutNum.png'
import moment from 'moment'
import ShopStoreDataLine from '@/views/biz-components/stat/shop-store-data-line'
import WholeTable from './components#/whole-table'
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
    salesCategory: 'sales-category',
    headerContent: 'header-content'
  },
  data() {
    return {
      height325: 325,
      height332: 332,
      wholenavIndex: 0,
      pieImg,
      inoutNumImg,
      wholeNavcom: 'shop-store-data-ring',
      headerInfo,
      wholeNav,
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
    WholeTable,
    BuyConsumptionTables,
    SalesAnalysis,
    BuyNumber,
    ShopStoreDataRing,
    ShopStoreDataRevenueRing,
    BrandUserAvgBar
  },
  mounted() {
    this.$nextTick(() => {
      console.log(this.storeBoard)
      this.wholenavFilter()
    })
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
      if (data[this.fieldNav[this.wholenavIndex]].trend.length) {
        return data[this.fieldNav[this.wholenavIndex]].trend.map(item => {
          return {
            date: item.date,
            amount: item[fieldInfo[this.wholenavIndex]]
          }
        })
      } else {
        return []
      }
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
        'value'
      ]
      return this.filterOrderMember(...filterOrderMemberData)
    },
    filterOrderMember(value, fieldNav, wholenavIndex, that, type) {
      if (!Array.isArray(value[fieldNav[wholenavIndex]].source)) {
        return value[fieldNav[wholenavIndex]].source[that].map(item => {
          return {
            name: item.type,
            value: item[type]
          }
        })
      } else {
        return []
      }
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
    wholenavFilter() {
      let titles = [
        'revenue_amount',
        'order_count',
        'transaction_member',
        'customer_price'
      ]
      let field = ['amount', 'count', 'count', 'price']
      let data = this.storeBoard
      this.wholeNav.forEach((item, index) => {
        let dataInfo = data[titles[index]][field[index]]
        this.$set(item, 'num', dataInfo)
        // item.num = dataInfo
        item.unit = data[titles[index]].unit
      })
    },
    onChangeTabs(query) {
      this.tabsObjData = Object.assign(this.tabsObjData, { choose_type: query })
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
