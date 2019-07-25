<template>
  <div :class="bPage()">
    <div :class="bPage('count')"></div>
    <recent-radio-group @change="recentChange"></recent-radio-group>
    <st-table
      :page="page"
      @change="onTableChange"
      :loading="loading.getList"
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
import { columns } from './revenue.config.ts'
import RecentRadioGroup from '@/views/pages/shop/dashboard#/recent-radio-group'
export default {
  mixins: [tableMixin],
  bem: {
    bPage: 'page-shop-stat-order'
  },
  serviceInject() {
    return {
      routeService: RouteService,
      OrderService: OrderService
    }
  },
  rxState() {
    return {
      query: this.routeService.query$,
      loading: this.OrderService.loading$,
      list: this.OrderService.list$,
      page: this.OrderService.page$
    }
  },
  data() {
    return {}
  },
  created() {
    this.onSearch()
  },
  computed: {
    columns
  },
  components: { RecentRadioGroup },
  methods: {
    getList() {},
    recentChange(query) {
      this.OrderService.getOrderShopList(query).subscribe()
    }
  }
}
</script>
