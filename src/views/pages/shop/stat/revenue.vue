<template>
  <st-panel app>
    <div :class="bPage()">
      <div :class="bPage('count')">
        <st-refresh-btn :date="todayInfo$.time" :action="refresh" />
        <a-row :class="bPage('income-row')">
          <div :class="bPage('income-detail')">
            <swiper :options="sliderOptions">
              <swiper-slide
                v-for="(item, index) in todayInfo$.res"
                :key="index"
              >
                <div :class="bPage('income')">
                  <p :class="bPage('income-label')">{{ item.label }}</p>
                  <p :class="bPage('income-value')">{{ item.value }}</p>
                </div>
              </swiper-slide>
            </swiper>
            <div
              class="swiper-r-button-prev swiper-button-prev"
              slot="button-prev"
            >
              <st-icon type="arrow-left" class="arrow-left" />
            </div>
            <div
              class="swiper-r-button-next swiper-button-next"
              slot="button-next"
            >
              <st-icon type="arrow-right" class="arrow-right" />
            </div>
          </div>
        </a-row>
      </div>
      <st-table-header-section class="mg-b16">
        <st-button
          type="primary"
          v-if="auth$.export"
          v-export-excel="{
            type: 'revenue/shop',
            query: $searchQuery
          }"
        >
          全部导出
        </st-button>
        <div slot="actions">
          <st-recent-radio-group @change="recentChange"></st-recent-radio-group>
        </div>
      </st-table-header-section>

      <!-- :alertSelection="{ onReset: onSelectionReset }" -->
      <!-- :rowSelection="{ selectedRowKeys, onChange: onSelectionChange }" -->
      <st-total
        :class="bPage('total')"
        :indexs="totalColumns"
        :dataSource="total$"
        hasTitle
      ></st-total>
      <st-table
        :page="page$"
        @change="onTableChange"
        class="mg-t12"
        :loading="loading$.getRevenueShopList"
        :columns="columns"
        :dataSource="list$"
        rowKey="id"
      ></st-table>
    </div>
  </st-panel>
</template>
<script>
import { RevenueService } from './revenue.service'
import tableMixin from '@/mixins/table.mixin'
import { columns, totalColumns } from './revenue.config.ts'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  mixins: [tableMixin],
  bem: {
    bPage: 'page-shop-stat-revenue'
  },
  serviceInject() {
    return {
      revenueService: RevenueService
    }
  },
  rxState() {
    const {
      loading$,
      list$,
      page$,
      todayInfo$,
      total$,
      auth$
    } = this.revenueService
    return { loading$, list$, page$, todayInfo$, total$, auth$ }
  },
  data() {
    return {
      sliderOptions: {
        autoplay: false,
        navigation: {
          nextEl: '.swiper-r-button-next',
          prevEl: '.swiper-r-button-prev'
        },
        slidesPerView: 6,
        centeredSlides: false,
        normalizeSlideIndex: false
      }
    }
  },
  computed: {
    columns,
    totalColumns
  },
  components: { swiper, swiperSlide },
  created() {
    this.getRevenueShopToday().subscribe()
  },
  methods: {
    recentChange(searchFieldsValue) {
      this.onMultiSearch(searchFieldsValue)
    },
    getRevenueShopToday() {
      return this.revenueService.getRevenueShopToday()
    },
    refresh() {
      return this.getRevenueShopToday()
    }
  }
}
</script>
