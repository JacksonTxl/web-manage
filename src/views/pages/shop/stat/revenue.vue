<template>
  <div :class="bPage()">
    <div :class="bPage('count')">
      <div :class="bPage('actions')">
        最近更新时间：
        <span :class="bPage('actions-span')" class="mg-r8">
          {{ todayInfo.time }}
        </span>
        <span @click="refresh">
          <st-icon type="refresh"></st-icon>
        </span>
      </div>
      <a-row :class="bPage('income-row')">
        <div :class="bPage('income-detail')">
          <swiper :options="sliderOptions">
            <swiper-slide v-for="(item, index) in todayInfo.res" :key="index">
              <div :class="bPage('income')">
                <p :class="bPage('income-label')">{{ item.label }}</p>
                <p :class="bPage('income-value')">{{ item.value }}</p>
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
    <div class="mg-b16" :class="bPage('count-action')">
      <span>
        <!-- <st-button type="primary" class="shop-member-list-button">批量导出</st-button> -->
      </span>
      <span>
        <st-recent-radio-group @change="recentChange"></st-recent-radio-group>
      </span>
    </div>
    <st-table
      :page="page"
      @change="onTableChange"
      :loading="loading.getRevenueShopList"
      :columns="columns"
      :dataSource="list"
      :alertSelection="{ onReset: onSelectionReset }"
      :rowSelection="{ selectedRowKeys, onChange: onSelectionChange }"
      rowKey="id"
    ></st-table>
  </div>
</template>
<script>
import { RevenueService } from './revenue.service'
import { RouteService } from '@/services/route.service'
import tableMixin from '@/mixins/table.mixin'
import { columns } from './revenue.config.ts'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  mixins: [tableMixin],
  bem: {
    bPage: 'page-shop-stat-revenue'
  },
  serviceInject() {
    return {
      routeService: RouteService,
      revenueService: RevenueService
    }
  },
  rxState() {
    return {
      query: this.routeService.query$,
      loading: this.revenueService.loading$,
      list: this.revenueService.list$,
      page: this.revenueService.page$,
      todayInfo: this.revenueService.todayInfo$
      // auth: this.revenueService.auth$
    }
  },
  data() {
    return {
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
  computed: {
    columns
  },
  components: { swiper, swiperSlide },
  created() {
    console.log(this.todayInfo)
    this.getRevenueShopToday()
  },
  methods: {
    getList() {},
    recentChange(searchFieldsValue) {
      this.onMultiSearch(searchFieldsValue)
    },
    getRevenueShopToday() {
      return this.revenueService.getRevenueShopToday().subscribe()
    },
    refresh() {
      this.getRevenueShopToday()
    }
  }
}
</script>
