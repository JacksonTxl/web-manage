<template>
  <div :class="bPage()">
    <div :class="bPage('count')"></div>
    <div class="mg-b16" :class="bPage('count-action')">
      <span>
        <!-- <st-button type="primary" class="shop-member-list-button">批量导出</st-button> -->
      </span>
      <span>
        <st-recent-radio-group @change="recentChange"></st-recent-radio-group>
      </span>
    </div>
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
import PageRouteNav from '@/views/components/page-route-nav#/nav'
import { OrderService } from './order.service'
import { RouteService } from '@/services/route.service'
import tableMixin from '@/mixins/table.mixin'
import { columns } from './order.config.ts'
export default {
  mixins: [tableMixin],
  bem: {
    bPage: 'page-shop-stat-order'
  },
  serviceInject() {
    return {
      routeService: RouteService,
      orderService: OrderService
    }
  },
  rxState() {
    return {
      query: this.routeService.query$,
      loading: this.orderService.loading$,
      list: this.orderService.list$,
      page: this.orderService.page$
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
