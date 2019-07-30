<template>
  <div :class="bPage()">
    <div :class="bPage('count')"></div>
    <a-row class="mg-b16">
      <a-col :span="4">
        <st-button type="primary" class="shop-member-list-button">批量导出</st-button>
      </a-col>
      <recent-radio-group class="ta-r" @change="recentChange"></recent-radio-group>
    </a-row>
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
import { columns } from './order.config.ts'
import RecentRadioGroup from '@/views/pages/shop/dashboard#/recent-radio-group'
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
      this.orderService.getOrderShopList(query).subscribe()
    }
  }
}
</script>
