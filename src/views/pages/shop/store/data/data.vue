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
            <date-picker></date-picker>
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
                    {{ wholenavTitle }}
                  </st-t3>
                  <shop-stored-data-line
                    :data="filterLine(storeBoard, wholenavTitle)"
                    :unit="wholenavTitle[wholenavTitle.length - 2]"
                  ></shop-stored-data-line>
                </div>
              </a-col>
              <a-col :span="8">
                <div class="ring">
                  <whole-tabls @change="onChangeTabs">
                    <template v-slot:user>
                      <component
                        v-bind:is="wholeNavcom"
                        :guideName="filterOrderMemberTitle()"
                        :unit="wholenavTitle | filterCompany"
                        :data="
                          filterMember(storeBoard, 0, 'order', wholenavTitle)
                        "
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
                        :unit="wholenavTitle | filterCompany(1)"
                        :data="
                          filterMember(storeBoard, 0, 'member', wholenavTitle)
                        "
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
                  <date-picker></date-picker>
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
                    <date-picker class="date-picker"></date-picker>
                  </st-container>
                  <div class="category">
                    <st-t3>类目营收占比</st-t3>
                    <shop-stored-data-revenue-ring
                      :data="categoryRevenue"
                      :sum="storeCategoryRank.total_revenue"
                      :padding="[60, '50%', 38, 0]"
                      style="width: 100%;"
                    ></shop-stored-data-revenue-ring>
                  </div>
                </div>
              </a-col>
            </a-row>
          </div>
        </div>
        <!-- 购买次数 消费金额 -->
        <div class="buy-consumption">
          <buy-consumption-tables @change="onChangeTabs">
            <template v-slot:user>
              <buy-number></buy-number>
            </template>
            <template v-slot:marketing>
              <buy-number></buy-number>
            </template>
          </buy-consumption-tables>
        </div>
      </section>
    </st-panel-layout>
  </div>
</template>
<script>
import ShopStoredDataLine from '@/views/biz-components/stat/shop-stored-data-line'
import WholeTabls from './components#/whole-tabls'
import BuyConsumptionTables from './components#/buy-consumption-tables'
import DatePicker from './components#/date-picker'
import SalesAnalysis from './components#/sales-analysis'
import BuyNumber from './components#/buy-number'
import ShopStoredDataRing from '@/views/biz-components/stat/shop-stored-data-ring'
import ShopStoredDataRevenueRing from '@/views/biz-components/stat/shop-stored-data-revenue-ring'
import BrandUserAvgBar from '@/views/biz-components/stat/shop-stored-data-avg-bar'
import { DataService } from './data.service'
import { forEach } from 'lodash-es'
import {
  headerInfo,
  wholeNav,
  moneyOrder,
  categoryRevenue,
  salesList,
  headerTitleItem,
  courseDaily
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
      storeCategoryRank: this.dataService.storeCategoryRank$
    }
  },
  bem: {
    basic: 'shop-stored-data',
    salesCategory: 'sales-category'
  },
  data() {
    return {
      height325: 325,
      height332: 332,
      wholenavTitle: '营收金额(元)',
      wholenavIndex: 0,
      wholeNavcom: 'shop-stored-data-ring',
      headerTitleItem,
      headerInfo,
      wholeNav,
      moneyOrder,
      categoryRevenue,
      salesList,
      courseDaily
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
    // 整体看板订单/会员折线图
    filterLine(data, type) {
      let fieldNav = [
        'revenue_amount',
        'order_count',
        'transaction_member',
        'customer_price'
      ]
      let fieldInfo = ['amount', 'count', 'count', 'price']
      if (type === '营收金额(元)') {
        return this.switchFunc(data, fieldNav, fieldInfo, 0)
      } else if (type === '订单数(单) ') {
        return this.switchFunc(data, fieldNav, fieldInfo, 1)
      } else if (type === '交易会员数(人)') {
        return this.switchFunc(data, fieldNav, fieldInfo, 2)
      } else {
        return this.switchFunc(data, fieldNav, fieldInfo, 3)
      }
    },
    switchFunc(data, fieldNav, fieldInfo, index) {
      return data[fieldNav[index]].trend.map(item => {
        return {
          date: item.date,
          amount: item[fieldInfo[index]]
        }
      })
    },
    // 整体看板订单/会员
    filterMember(value, flag, that, wholenavTitle) {
      if (wholenavTitle === '营收金额(元)') {
        return value.revenue_amount.source[that].map(item => {
          return {
            name: item.type,
            value: item.value
          }
        })
      } else if (wholenavTitle === '订单数(单)') {
        return value.order_count.source[that].map(item => {
          return {
            name: item.type,
            value: item.count
          }
        })
      } else if (wholenavTitle === '交易会员数(人)') {
        if (that === 'order') {
          return value.transaction_member.source[that].map(item => {
            return {
              name: item.type,
              value: item.amount
            }
          })
        } else {
          return value.transaction_member.source[that].map(item => {
            return {
              name: item.type,
              value: item.count
            }
          })
        }
      } else {
        if (that === 'order') {
          return value.customer_price.source[that].map(item => {
            return {
              name: item.type,
              value: item.amount
            }
          })
        } else {
          return value.customer_price.source[that].map(item => {
            return {
              name: item.type,
              value: item.count
            }
          })
        }
      }
    },
    // 订单来源/会员身份标题
    filterOrderMemberTitle() {
      let title = ['营收金额(元)', '订单数(单)']
      if (title.find(item => item === this.wholenavTitle)) {
        if (this.wholenavTitle === title[0]) {
          return '总营收'
        } else {
          return '订单数'
        }
      }
    },
    // 整体看板数据处理
    wholenavFilter(data) {
      console.log(data)
      let titles = [
        'revenue_amount',
        'order_count',
        'transaction_member',
        'customer_price'
      ]
      let field = ['amount', 'count', 'count', 'price']
      this.wholeNav.forEach((item, index) => {
        let dataInfo = data[titles[index]][field[index]]
        console.log(this.wholenavIndex)
        item.num = dataInfo
      })
    },
    // 类目分析数据处理
    storeCategoryRankFilter(data) {
      console.log(data)
      this.categoryRevenue = data.category_list.map(item => {
        return {
          name: item.category_name,
          value: item.amount
        }
      })
    },

    onChangeTabs(query) {
      console.log(query)
    },
    refresh() {
      return this.dataService.getDataProfile(this.chartTodayShop)
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
