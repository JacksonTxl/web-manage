<template>
  <div :class="bPage()">
    <div :class="bPage('count')">
      <st-refresh-btn :date="totalInfo.time" :action="refresh" />
      <a-row :class="bPage('income-row')">
        <div :class="bPage('income-detail')">
          <swiper :options="sliderOptions">
            <swiper-slide v-for="(item, index) in totalInfo.res" :key="index">
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
      <div :class="bPage('left')">
        <!-- TODO: <st-button type="primary" class="shop-member-list-button">批量导出</st-button> -->
        <a-radio-group :value="showTable" @change="handleSizeChange">
          <a-radio-button value="all">日期</a-radio-button>
          <a-radio-button value="staff">员工</a-radio-button>
        </a-radio-group>
      </div>
      <span>
        <!-- <st-button type="primary" class="shop-member-list-button">批量导出</st-button> -->
      </span>
      <span>
        <st-recent-radio-group @change="recentChange"></st-recent-radio-group>
      </span>
    </div>
    <!-- :alertSelection="{ onReset: onSelectionReset }" -->
    <!-- :rowSelection="{ selectedRowKeys, onChange: onSelectionChange }" -->
    <st-table
      :page="page"
      @change="onTableChange"
      :loading="loading.getFollowShopList"
      :columns="columns"
      :dataSource="list"
      rowKey="id"
    ></st-table>
  </div>
</template>
<script>
import { FollowService } from './follow.service'
import { RouteService } from '@/services/route.service'
import { UserService } from '@/services/user.service'
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
      routeService: RouteService,
      followService: FollowService,
      userService: UserService
    }
  },
  rxState() {
    return {
      query: this.routeService.query$,
      loading: this.followService.loading$,
      list: this.followService.list$,
      page: this.followService.page$,
      totalInfo: this.followService.totalInfo$,
      shop: this.userService.shop$
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
  created() {
    query.shop_id = this.shop.id
    this.getFollowShopTotal(query).subscribe()
  },
  methods: {
    recentChange(searchFieldsValue) {
      this.onMultiSearch(searchFieldsValue)
    },
    getFollowShopTotal(query) {
      return this.followService.getFollowShopTotal(query)
    },
    refresh() {
      return this.getFollowShopTotal(query)
    },
    handleSizeChange(val) {
      this.showTable = val.target.value
      let query = { showTable: this.showTable }
      query.shop_id = this.shop.id
      this.$router.push({ query })
    }
  }
}
</script>
