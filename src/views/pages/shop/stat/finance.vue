<template>
  <div :class="bPage()">
    <section class="mg-b16" :class="bHeard()">
      <div :class="bHeard('left')">
        <!-- TODO: <st-button type="primary" class="shop-member-list-button">批量导出</st-button> -->
      </div>
      <div :class="bHeard('right')">
        <st-recent-radio-group @change="recentChange"></st-recent-radio-group>
      </div>
    </section>
    <st-table
      :page="page"
      :scroll="{ x: 1800 }"
      @change="onTableChange"
      :loading="loading.getOrderShopList"
      :columns="columns"
      :dataSource="list"
      rowKey="id"
    ></st-table>
  </div>
</template>
<script>
import { FinanceService } from './finance.service'
import { RouteService } from '@/services/route.service'
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
      routeService: RouteService,
      financeService: FinanceService
    }
  },
  rxState() {
    return {
      query: this.routeService.query$,
      loading: this.financeService.loading$,
      list: this.financeService.list$,
      page: this.financeService.page$
    }
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
