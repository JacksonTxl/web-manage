<template>
  <div :class="basic()">
    <st-panel-layout :class="basic('main')">
      <st-panel class="mg-t16" title="云店概览">
        <div slot="actions">
          <st-refresh-btn :action="refresh"></st-refresh-btn>
        </div>
        <ul :class="basic('header_content')">
          <li v-for="(item, index) in headerInfo" :key="index">
            <img :src="item.icon" />
            <div>
              <div>{{ item.title }}</div>
              <div>
                <i-count-up
                  :endVal="item.sum"
                  :options="{
                    decimalPlaces: item.sum.toString().includes('.') ? 2 : 0,
                    decimal: '.'
                  }"
                />
              </div>
              <div>
                昨日:
                <i-count-up
                  :endVal="item.yesterday"
                  :options="{
                    decimalPlaces: item.sum.toString().includes('.') ? 2 : 0,
                    decimal: '.',
                    prefix: ''
                  }"
                />
              </div>
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
                  <st-t3>
                    {{ wholenavTitle }}
                  </st-t3>
                  <shop-stored-data-line
                    :data="courseDaily"
                  ></shop-stored-data-line>
                </div>
              </a-col>
              <a-col :span="8">
                <div class="ring">
                  <whole-tabls @change="onChangeTabs">
                    <template v-slot:user>
                      <component
                        v-bind:is="wholeNavcom"
                        :data="dataRing"
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
                        :data="dataRing"
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
                  <div class="category">
                    <st-t3>类目营收占比</st-t3>
                    <shop-stored-data-revenue-ring
                      :data="dataRingss"
                      :padding="[60, '30%', 38, 0]"
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
import BrandUserAvgBar from '@/views/biz-components/stat/brand-user-avg-bar'
import { DataService } from './data.service'
import {
  headerInfo,
  wholeNav,
  dataRing,
  dataRingss,
  salesList,
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
      dataProfile: this.dataService.dataProfile$
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
      headerInfo,
      wholeNav,
      dataRing,
      dataRingss,
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
  methods: {
    onChangeTabs(query) {
      console.log(query)
    },
    refresh() {
      return () => {}
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
