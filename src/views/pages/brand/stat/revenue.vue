<template>
  <div :class="b()">
    <div :class="b('section')">
      <header :class="bHeader('header')">
        <st-t3 :class="bHeader('title')">
          营收概览
        </st-t3>
        <div :class="bHeader('actions')">
          <shop-select
            v-model="dataParam.shop_id"
            @change="onChangeChartShop"
            class="mg-r12"
          />
          <st-recent-radio-group
            @change="onChangeChartDays"
          ></st-recent-radio-group>
        </div>
      </header>
      <div class="mg-t36" style="display: flex">
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
    <st-hr></st-hr>
    <div :class="b('section')">
      <header :class="bHeader('header')">
        <st-t3 :class="bHeader('title')">当日营收</st-t3>
        <div :class="bHeader('actions')">
          <shop-select
            class="mg-r12"
            v-model="chartTodayShop"
            @change="getDataToday"
          />
          <st-refresh-btn :action="refresh"></st-refresh-btn>
        </div>
      </header>
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
          <div
            class="swiper-revenue-button-prev swiper-button-prev"
            slot="button-prev"
          >
            <st-icon type="arrow-left" class="arrow-left" />
          </div>
          <div
            class="swiper-revenue-button-next swiper-button-next"
            slot="button-next"
          >
            <st-icon type="arrow-right" class="arrow-right" />
          </div>
        </div>
      </a-row>
    </div>
    <st-hr />
    <div :class="b('section')">
      <header :class="bHeader('header')">
        <div :class="bHeader('button-wapper')">
          <st-button
            type="primary"
            v-if="auth.export"
            v-export-excel="{
              type: 'revenue/brand',
              query: $searchQuery
            }"
          >
            全部导出
          </st-button>
        </div>
        <div :class="bHeader('actions')">
          <shop-select
            v-model="$searchQuery.shop_id"
            @change="onSingleSearch('shop_id', $event)"
            class="mg-r12"
          />
          <st-recent-radio-group
            @change="onChangeDataDays"
            :value="$searchQuery"
          ></st-recent-radio-group>
        </div>
      </header>
      <st-total
        class="mg-t16"
        :class="b('total')"
        :indexs="totalColumns"
        :dataSource="total"
        hasTitle
      ></st-total>
      <st-table
        :loading="loading.getList"
        :columns="columns"
        class="mg-t16"
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
import shopSelect from '@/views/biz-components/shop-select'
import BrandStatisticsRevenueLine from '@/views/biz-components/stat/brand-stat-revenue-line'
import BrandStatisticsRevenueRing from '@/views/biz-components/stat/brand-stat-revenue-ring'
import { RevenueService } from './revenue.service'
import tableMixin from '@/mixins/table.mixin'
import { columns, totalColumns } from './revenue.config'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  name: 'BrandStatInfoRevenue',
  mixins: [tableMixin],
  serviceInject() {
    return {
      revenueService: RevenueService
    }
  },
  rxState() {
    return {
      list: this.revenueService.list$,
      page: this.revenueService.page$,
      total: this.revenueService.total$,
      auth: this.revenueService.auth$,
      dataRing: this.revenueService.dataRing$,
      dataLine: this.revenueService.dataLine$,
      dataToday: this.revenueService.dataToday$,
      loading: this.revenueService.loading$
    }
  },
  bem: {
    b: 'page-brand-stat-revenue',
    bHeader: 'page-brand-stat-header'
  },
  data() {
    return {
      chartParam: {
        shop_id: -1,
        day: 7,
        start_date: undefined,
        end_date: undefined
      },
      chartTodayShop: -1,
      dataParam: {
        shop_id: -1,
        day: 7
      },
      sliderOptions: {
        autoplay: false,
        navigation: {
          nextEl: '.swiper-revenue-button-next',
          prevEl: '.swiper-revenue-button-prev'
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
    columns,
    totalColumns
  },
  methods: {
    onChangeChartShop(event) {
      this.chartParam.shop_id = event
      this.getChart()
    },
    onChangeChartDays(event) {
      this.chartParam.day = event.recently_day || undefined
      this.chartParam.start_date = event.start_date || undefined
      this.chartParam.end_date = event.end_date || undefined
      this.getChart()
    },
    onChangeDataShop(event) {
      this.$searchQuery.shop_id = event
      this.onSearch()
    },
    onChangeDataDays(event) {
      this.$searchQuery.day = event.recently_day || undefined
      this.$searchQuery.start_date = event.start_date || undefined
      this.$searchQuery.end_date = event.end_date || undefined
      this.onSearch()
    },
    getDataToday() {
      return this.revenueService.getDataToday(this.chartTodayShop).subscribe()
    },
    refresh() {
      return this.revenueService.getDataToday(this.chartTodayShop)
    },
    getChart() {
      this.revenueService.getChart(this.chartParam).subscribe()
    }
  },
  components: {
    shopSelect,
    BrandStatisticsRevenueLine,
    BrandStatisticsRevenueRing,
    swiper,
    swiperSlide
  }
}
</script>
