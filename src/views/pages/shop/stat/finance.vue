<template>
  <div :class="bPage()">
    <section class="mg-b16" :class="bHeard()">
      <div :class="bHeard('left')">
        <div :class="bPage('button-wapper')">
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
        </div>
      </div>
      <div :class="bHeard('right')">
        <st-recent-radio-group @change="recentChange"></st-recent-radio-group>
      </div>
    </section>
    <st-total
      :class="bPage('total')"
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
  </div>
</template>
<script>
import { FinanceService } from './finance.service'
import tableMixin from '@/mixins/table.mixin'
import { columns } from './finance.config.ts'
export default {
  mixins: [tableMixin],
  bem: {
    bPage: 'page-shop-stat-finance',
    bHeard: 'header'
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
