<template>
  <div :class="b()">
    <div :class="b('section')">
      <a-row>
        <a-col :span="4" :class="b('title')">
          营收概览
        </a-col>
        <a-col :span="20" :class="b('actions')">
          <brand-shop
            @change="onChangeChartShop"
            style="flex: 1;margin-right: 12px;text-align: right;"
          ></brand-shop>
          <st-recent-radio-group
            @change="onChangeChartDays"
          ></st-recent-radio-group>
        </a-col>
      </a-row>
      <div style="margin-top: 38px;display: flex">
        <brand-statistics-revenue-line
          :data="dataLine"
          style="width: calc(100% - 365px);height: 285px;"
        ></brand-statistics-revenue-line>
        <brand-statistics-revenue-ring
          :data="dataRing"
          style="width: 365px;"
        ></brand-statistics-revenue-ring>
      </div>
    </div>
    <div :class="b('section')">
      <a-row>
        <a-col :span="4" :class="b('title')">
          当日营收
        </a-col>
        <a-col :span="20" :class="b('actions')">
          <brand-shop
            style="flex: 1;margin-right: 12px;text-align: right;"
            @change="onChangeTodayShop"
          ></brand-shop>
          <span :class="b('actions-span')">
            最近更新时间：{{ dataToday.time }}
          </span>
        </a-col>
      </a-row>
      <a-row :class="b('income-row')">
        <div :class="b('income-detail')">
          <swiper :options="sliderOptions">
            <swiper-slide v-for="(item, index) in dataToday.data" :key="index">
              <div :class="b('income')">
                <p :class="b('income-label')">{{ item.label }}</p>
                <p :class="b('income-value')">{{ item.value }}</p>
              </div>
            </swiper-slide>
          </swiper>
          <div class="swiper-button-prev" slot="button-prev">
            <st-icon type="arrow-left" class="arrow-left" />
          </div>
          <div class="swiper-button-next" slot="button-next">
            <st-icon type="arrow-right1" class="arrow-right1" />
          </div>
        </div>
      </a-row>
    </div>
    <div :class="b('section')">
      <a-row class="mg-b16">
        <a-col :span="4" :class="b('title')">
          <!-- TODO: 本期不实现 -->
          <!-- <st-button type="primary" class="shop-member-list-button" v-if="auth.export">
            批量导出
          </st-button> -->
        </a-col>
        <a-col :span="20" :class="b('actions')">
          <brand-shop
            style="flex: 1;margin-right: 12px;text-align: right;"
            @change="onChangeDataShop"
          ></brand-shop>
          <st-recent-radio-group
            @change="onChangeDataDays"
            :value="query"
          ></st-recent-radio-group>
          <!-- <recent-radio-group  @change="onChangeDataDays" :value="query"></recent-radio-group> -->
        </a-col>
      </a-row>
      <st-table
        :loading="loading.getList"
        :columns="columns"
        :scroll="{ x: 1400 }"
        rowKey="member_id"
        :page="page"
        @change="onTableChange"
        :dataSource="list"
      ></st-table>
      <!-- NOTE 本期不做，隐藏复选框 TODO: -->
      <!-- :alertSelection="{onReset:onSelectionReset}"
        :rowSelection="{selectedRowKeys,onChange:onSelectionChange}" -->
    </div>
  </div>
</template>

<script>
import BrandShop from './components#/brand-shop'
import BrandStatisticsRevenueLine from '@/views/biz-components/stat/brand-stat-revenue-line'
import BrandStatisticsRevenueRing from '@/views/biz-components/stat/brand-stat-revenue-ring'
import { RouteService } from '@/services/route.service'
import { RevenueService } from './revenue.service'
import tableMixin from '@/mixins/table.mixin'
import { columns } from './revenue.config'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  name: 'BrandStatInfoRevenue',
  mixins: [tableMixin],
  serviceInject() {
    return {
      revenueService: RevenueService,
      routeService: RouteService
    }
  },
  rxState() {
    return {
      query: this.routeService.query$,
      list: this.revenueService.list$,
      page: this.revenueService.page$,
      auth: this.revenueService.auth$,
      dataRing: this.revenueService.dataRing$,
      dataLine: this.revenueService.dataLine$,
      dataToday: this.revenueService.dataToday$,
      loading: this.revenueService.loading$
    }
  },
  bem: {
    b: 'page-brand-stat-revenue'
  },
  data() {
    return {
      chartParam: {
        shop: 0,
        day: 7,
        start_date: undefined,
        end_date: undefined
      },
      chartTodayShop: 0,
      dataParam: {
        shop: 0,
        day: 7
      },
      sliderOptions: {
        autoplay: false,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        slidesPerView: 6,
        centeredSlides: false,
        normalizeSlideIndex: false
      }
    }
  },
  created() {
    this.getChart()
    this.getDataToday()
  },
  computed: {
    columns
  },
  methods: {
    onChangeChartShop(event) {
      this.chartParam.shop = event
      this.getChart()
    },
    onChangeChartDays(event) {
      this.chartParam.day = event.recently_day || undefined
      this.chartParam.start_date = event.start_date || undefined
      this.chartParam.end_date = event.end_date || undefined
      this.getChart()
    },
    onChangeTodayShop(event) {
      this.chartTodayShop = event
      this.getDataToday()
    },
    onChangeDataShop(event) {
      this.query.shop_id = event
      this.onSearch()
    },
    onChangeDataDays(event) {
      this.query.day = event.recently_day || undefined
      this.query.start_date = event.start_date || undefined
      this.query.end_date = event.end_date || undefined
      this.onSearch()
    },
    getDataToday() {
      this.revenueService.getDataToday(this.chartTodayShop).subscribe()
    },
    getChart() {
      this.revenueService.getChart(this.chartParam).subscribe()
    }
  },
  components: {
    BrandShop,
    BrandStatisticsRevenueLine,
    BrandStatisticsRevenueRing,
    swiper,
    swiperSlide
  }
}
</script>
