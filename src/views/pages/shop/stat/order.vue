<template>
  <div :class="bPage()">
    <div :class="bPage('count')"></div>
    <div class="mg-b16" :class="bPage('count-action')">
      <div :class="bPage('button-wapper')">
        <st-button
          type="primary"
          v-export-excel="{
            type: 'order/shop',
            query: $searchQuery
          }"
        >
          全部导出
        </st-button>
      </div>
      <span>
        <st-recent-radio-group @change="recentChange"></st-recent-radio-group>
      </span>
    </div>
    <st-total
      :class="bPage('total')"
      :indexs="columns"
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
  </div>
</template>
<script>
import { OrderService } from './order.service'
import tableMixin from '@/mixins/table.mixin'
import { columns } from './order.config.ts'
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
    const { loading$, list$, page$, total$ } = this.orderService
    return {
      loading$,
      list$,
      total$,
      page$
    }
  },
  data() {
    return {}
  },
  created() {},
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
