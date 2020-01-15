<template>
  <st-panel app>
    <div :class="bPage('count')"></div>
    <st-table-header-section>
      <st-button
        type="primary"
        v-if="auth$.export"
        v-export-excel="{
          type: 'order/shop',
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
      :indexs="totalColumns"
      :dataSource="total$"
      hasTitle
    ></st-total>
    <st-table
      class="mg-t12"
      :page="page$"
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
import { OrderService } from './order.service'
import tableMixin from '@/mixins/table.mixin'
import { columns, totalColumns } from './order.config.ts'
export default {
  mixins: [tableMixin],
  bem: {
    bPage: 'page-shop-stat-order'
  },
  serviceInject() {
    return {
      orderService: OrderService
    }
  },
  rxState() {
    const { loading$, list$, page$, total$, auth$ } = this.orderService
    return {
      loading$,
      list$,
      total$,
      auth$,
      page$
    }
  },
  computed: {
    columns,
    totalColumns
  },
  methods: {
    recentChange(searchFieldsValue) {
      this.onMultiSearch(searchFieldsValue)
    }
  }
}
</script>
