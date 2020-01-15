<template>
  <div>
    <st-table-header-section>
      <st-button
        type="primary"
        v-if="auth.export"
        v-export-excel="{
          type: 'sale/summary',
          query: $searchQuery
        }"
      >
        全部导出
      </st-button>

      <st-recent-radio-group
        slot="actions"
        @change="recentChange"
      ></st-recent-radio-group>
    </st-table-header-section>

    <st-total
      class="mg-t12"
      :indexs="totalColumns"
      :dataSource="total$"
      hasTitle
    >
      <template v-slot:performance_amount="record">
        <st-total-item
          @click.native="onCLickPerformanceAmount"
          :unit="record.unit"
          :label="record.label"
          :value="record.value"
        ></st-total-item>
      </template>
    </st-total>
    <st-table
      :page="page"
      :scroll="{ x: 2300 }"
      class="mg-t12"
      @change="onTableChange"
      :loading="loading.getSellList"
      :columns="columns"
      :dataSource="list"
      rowKey="id"
    >
      <a
        slot="performance_amount"
        @click="getSellTotalAmount(record)"
        slot-scope="text, record"
        v-if="text !== 0"
      >
        {{ text }}
      </a>
      <span v-else>{{ text }}</span>
      <span slot="memberTitle">
        {{ $c('member_card') }}成单数
        <st-help-tooltip id="TSSR001" />
      </span>
      <span slot="depositTitle">
        储值卡成单数
        <st-help-tooltip id="TSSR002" />
      </span>
      <!-- <span slot="teamTitle">
        团课购买节数
        <st-help-tooltip id="TSSR003" />
      </span> -->
      <span slot="totalTitle">
        总购课节数
        <st-help-tooltip id="TSSR004" />
      </span>
      <span slot="otherTitle">
        其它销售金额（元）
        <st-help-tooltip id="TSSR005" />
      </span>
      <span slot="performanceTitle">
        总销售业绩（元）
        <st-help-tooltip id="TSSR006" />
      </span>
    </st-table>
  </div>
</template>
<script>
import { SummaryService } from './summary.service'
import tableMixin from '@/mixins/table.mixin'
import ShopStatSellAmount from '@/views/biz-modals/shop/stat/sell-amount'
import { columns, totalColumns } from './summary.config.ts'
export default {
  mixins: [tableMixin],
  bem: {
    bPage: 'page-shop-stat-sell-summary'
  },
  modals: {
    ShopStatSellAmount
  },
  serviceInject() {
    return {
      summaryService: SummaryService
    }
  },
  rxState() {
    return {
      loading: this.summaryService.loading$,
      list: this.summaryService.list$,
      page: this.summaryService.page$,
      total$: this.summaryService.total$,
      auth: this.summaryService.auth$
    }
  },
  computed: {
    columns,
    totalColumns
  },
  methods: {
    onCLickPerformanceAmount() {
      this.$modalRouter.push({
        name: 'shop-stat-sell-amount',
        props: {
          type: 'total'
        }
      })
    },
    getSellTotalAmount(record) {
      this.$modalRouter.push({
        name: 'shop-stat-sell-amount',
        props: {
          record
        }
      })
    },
    recentChange(searchFieldsValue) {
      this.onMultiSearch(searchFieldsValue)
    }
  }
}
</script>
