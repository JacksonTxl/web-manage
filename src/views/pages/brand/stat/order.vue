<template>
  <div :class="b()">
    <div :class="b('section')">
      <header :class="bHeader('header')">
        <st-t3 :class="bHeader('title')">
          订单概览
        </st-t3>
        <div :class="bHeader('actions')">
          <shop-select
            :defaultValue="-1"
            class="mg-r12"
            v-model="chartParam.shop_id"
            @change="onChangeChartShop"
          />
          <st-recent-radio-group
            @change="onChangeChartDays"
          ></st-recent-radio-group>
        </div>
      </header>
      <a-row class="mg-t32">
        <brand-stat-order-facet-bar
          :data="chartData"
        ></brand-stat-order-facet-bar>
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
              type: 'order/brand',
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
        :scroll="{ x: 1800 }"
        rowKey="member_id"
        class="mg-t16"
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
import shopSelect from '@/views/biz-components/shop-select'
import BrandStatOrderFacetBar from '@/views/biz-components/stat/brand-stat-order-facet-bar'
import { OrderService } from './order.service'
import tableMixin from '@/mixins/table.mixin'
import { columns, totalColumns } from './order.config'
export default {
  name: 'BrandStatInfoOrder',
  mixins: [tableMixin],
  serviceInject() {
    return {
      orderService: OrderService
    }
  },
  rxState() {
    return {
      list: this.orderService.list$,
      page: this.orderService.page$,
      total: this.orderService.total$,
      auth: this.orderService.auth$,
      chartData: this.orderService.chartData$,
      loading: this.orderService.loading$
    }
  },
  bem: {
    b: 'page-brand-stat-order',
    bHeader: 'page-brand-stat-header'
  },
  watch: {},
  data() {
    return {
      chartParam: {
        shop_id: -1,
        day: 7,
        start_date: undefined,
        end_date: undefined
      },
      dataParam: {
        shop_id: -1,
        day: 7
      }
    }
  },
  created() {
    this.getChart()
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
    onChangeDataDays(event) {
      this.$searchQuery.day = event.recently_day || undefined
      this.$searchQuery.start_date = event.start_date || undefined
      this.$searchQuery.end_date = event.end_date || undefined
      this.onSearch()
    },
    getChart() {
      this.orderService.getChart(this.chartParam).subscribe()
    }
  },
  components: {
    shopSelect,
    BrandStatOrderFacetBar
  }
}
</script>
