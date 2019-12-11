<template>
  <div :class="bPage()">
    <div class="mg-b16" :class="bPage('count-action')">
      <div :class="bPage('left')">
        <!-- TODO: <st-button type="primary" class="shop-member-list-button">批量导出</st-button> -->
        <div :class="bPage('button-wapper')">
          <st-button
            type="primary"
            v-export-excel="{
              type: 'follow/shop',
              query: $searchQuery
            }"
          >
            全部导出
          </st-button>
        </div>
        <a-radio-group :value="showTable" @change="handleSizeChange">
          <a-radio-button value="all">日期</a-radio-button>
          <a-radio-button value="staff">员工</a-radio-button>
        </a-radio-group>
      </div>
      <span>
        <st-recent-radio-group @change="recentChange"></st-recent-radio-group>
      </span>
    </div>
    <div :class="bPage('count')">
      <a-row :class="bPage('income-row')">
        <div :class="bPage('income-detail')">
          <swiper :options="sliderOptions">
            <swiper-slide v-for="(item, index) in totalInfo$.list" :key="index">
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
    <!-- :alertSelection="{ onReset: onSelectionReset }" -->
    <!-- :rowSelection="{ selectedRowKeys, onChange: onSelectionChange }" -->
    <!-- <st-total
      :class="bPage('total')"
      :indexs="columns"
      :dataSource="total$"
      hasTitle
    ></st-total> -->
    <st-table
      :page="page$"
      class="mg-t12"
      @change="onTableChange"
      :loading="loading$.getFollowShopList"
      :columns="columns"
      :scroll="{ x: 1800 }"
      :dataSource="list$"
      rowKey="id"
    ></st-table>
  </div>
</template>
<script>
import { FollowService } from './follow.service'
import tableMixin from '@/mixins/table.mixin'
import { dateColumns, staffColumns } from './follow.config.ts'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  mixins: [tableMixin],
  bem: {
    bPage: 'page-shop-stat-follow'
  },
  serviceInject() {
    return {
      followService: FollowService
    }
  },
  rxState() {
    const { loading$, list$, page$, totalInfo$, total$ } = this.followService
    return {
      loading$,
      list$,
      page$,
      totalInfo$,
      total$
    }
  },
  data() {
    return {
      showTable: 'all',
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
    columns() {
      return this.showTable === 'all' ? dateColumns(this) : staffColumns(this)
    }
  },
  components: { swiper, swiperSlide },
  methods: {
    recentChange(searchFieldsValue) {
      this.onMultiSearch(searchFieldsValue)
    },
    getFollowShopTotal($searchQuery) {
      return this.followService.getFollowShopTotal($searchQuery)
    },
    refresh() {
      return this.getFollowShopTotal(this.$searchQuery)
    },
    handleSizeChange(val) {
      this.$searchQuery.showTable = this.showTable = val.target.value
      let query = this.$searchQuery
      this.$router.push({ query })
    }
  }
}
</script>
