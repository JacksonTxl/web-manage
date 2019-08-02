<template>
  <div :class="b()">
    <div :class="b('section')">
      <a-row>
        <a-col :span="4" :class="b('title')">
          订单概览
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
      <a-row style="margin-top: 34px;">
        <brand-stat-order-facet-bar
          :data="chartData"
        ></brand-stat-order-facet-bar>
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
        </a-col>
      </a-row>
      <st-table
        :loading="loading.getList"
        :columns="columns"
        :scroll="{ x: 1800 }"
        rowKey="member_id"
        :page="page"
        @change="onTableChange"
        :dataSource="list"
      ></st-table>
      <!-- NOTE 本期不做，隐藏复选框 TODO -->
      <!-- :alertSelection="{onReset:onSelectionReset}"
        :rowSelection="{selectedRowKeys,onChange:onSelectionChange}" -->
    </div>
  </div>
</template>

<script>
import BrandShop from './components#/brand-shop'
import BrandStatOrderFacetBar from '@/views/biz-components/stat/brand-stat-order-facet-bar'
import { RouteService } from '@/services/route.service'
import { OrderService } from './order.service'
import tableMixin from '@/mixins/table.mixin'
import { columns } from './order.config'
export default {
  name: 'BrandStatInfoOrder',
  mixins: [tableMixin],
  serviceInject() {
    return {
      orderService: OrderService,
      routeService: RouteService
    }
  },
  rxState() {
    return {
      query: this.routeService.query$,
      list: this.orderService.list$,
      page: this.orderService.page$,
      auth: this.orderService.auth$,
      chartData: this.orderService.chartData$,
      loading: this.orderService.loading$
    }
  },
  bem: {
    b: 'page-brand-stat-order'
  },
  watch: {},
  data() {
    return {
      chartParam: {
        shop: 0,
        day: 7,
        start_date: undefined,
        end_date: undefined
      },
      dataParam: {
        shop: 0,
        day: 7
      }
    }
  },
  created() {
    this.getChart()
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
    getChart() {
      this.orderService.getChart(this.chartParam).subscribe()
    }
  },
  components: {
    BrandShop,
    BrandStatOrderFacetBar
  }
}
</script>
