<template>
  <st-panel app>
    <st-table-header-section>
      <st-button
        type="primary"
        v-if="auth$.export"
        v-export-excel="{
          type: 'finance/shop',
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
      class="mg-t16"
      :indexs="columns"
      :dataSource="total$"
      hasTitle
    ></st-total>
    <st-table
      :page="page$"
      class="mg-t12"
      :scroll="{ x: 1800 }"
      @change="onTableChange"
      :loading="loading$.getOrderShopList"
      :columns="columns"
      :dataSource="list$"
      rowKey="id"
    ></st-table>
  </st-panel>
</template>
<script>
import { FinanceService } from './finance.service'
import tableMixin from '@/mixins/table.mixin'
import { columns } from './finance.config.ts'
export default {
  mixins: [tableMixin],
  bem: {
    bPage: 'page-shop-stat-finance'
  },
  serviceInject() {
    return {
      financeService: FinanceService
    }
  },
  rxState() {
    const { total$, page$, list$, loading$, auth$ } = this.financeService
    return { total$, page$, list$, loading$, auth$ }
  },
  data() {
    return {}
  },
  computed: {
    columns
  },
  methods: {
    recentChange(searchFieldsValue) {
      this.onMultiSearch(searchFieldsValue)
    }
  }
}
</script>
