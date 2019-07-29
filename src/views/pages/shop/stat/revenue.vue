<template>
  <div :class="bPage()">
    <div :class="bPage('count')">
      <a-row>
        <a-col :span="4" :class="bPage('title')">当日营收</a-col>
        <a-col :span="20" :class="bPage('actions')">
          <span :class="bPage('actions-span')">最近更新时间：{{todayInfo.time}}</span>
        </a-col>
      </a-row>
      <a-row :class="bPage('income-row')">
        <div :class="bPage('income-detail')">
          <swiper :options="sliderOptions">
            <swiper-slide

              v-for="(item, index) in todayInfo.res"
              :key="index"
            >
              <div :class="bPage('income')">
                <p :class="bPage('income-label')">{{item.label}}</p>
                <p :class="bPage('income-value')">{{item.value}}</p>
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
    <a-row class="mg-b16">
      <a-col :span="4">
        <st-button type="primary" class="shop-member-list-button">批量导出</st-button>
      </a-col>
      <recent-radio-group class="ta-r" @change="recentChange"></recent-radio-group>
    </a-row>
    <st-table
      :page="page"
      @change="onTableChange"
      :loading="loading.getList"
      :columns="columns"
      :dataSource="list"
      :alertSelection="{onReset:onSelectionReset}"
      :rowSelection="{selectedRowKeys,onChange:onSelectionChange}"
      rowKey="id"
    ></st-table>
  </div>
</template>
<script>
import PageRouteNav from '@/views/components/page-route-nav#/nav'
import { RevenueService } from './revenue.service'
import { RouteService } from '@/services/route.service'
import tableMixin from '@/mixins/table.mixin'
import { columns } from './revenue.config.ts'
import RecentRadioGroup from '@/views/pages/shop/dashboard#/recent-radio-group'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  mixins: [tableMixin],
  bem: {
    bPage: 'page-shop-stat-revenue'
  },
  serviceInject() {
    return {
      routeService: RouteService,
      RevenueService: RevenueService
    }
  },
  rxState() {
    return {
      query: this.routeService.query$,
      loading: this.RevenueService.loading$,
      list: this.RevenueService.list$,
      page: this.RevenueService.page$,
      todayInfo: this.RevenueService.todayInfo$
      // auth: this.revenueService.auth$
    }
  },
  data() {
    return {
      sliderOptions: {
        autoplay: false,
        navigation: {
          nextEl: '.swiper-button-prev',
          prevEl: '.swiper-button-next'
        },
        slidesPerView: 6,
        centeredSlides: false,
        normalizeSlideIndex: false
      }
    }
  },
  computed: {
    columns
  },
  components: { RecentRadioGroup, swiper, swiperSlide },
  created() {
    this.getRevenueShopToday()
    console.log(this.todayInfo)
  },
  methods: {
    getList() {},
    recentChange(query) {
      this.RevenueService.getRevenueShopList(query).subscribe()
    },
    onChangeTodayShop(event) {
      this.chartTodayShop = event
      this.getRevenueShopToday()
    },
    getRevenueShopToday() {
      return this.RevenueService.getRevenueShopToday().subscribe()
    }
  }
}
</script>
