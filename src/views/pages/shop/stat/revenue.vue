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
import { RevenueService } from './revenue.service'
import { RouteService } from '@/services/route.service'
import tableMixin from '@/mixins/table.mixin'
import { columns } from './revenue.config.ts'
import RecentRadioGroup from '@/views/pages/shop/dashboard#/recent-radio-group'

export default {
  mixins: [tableMixin],
  bem: {
    bPage: 'page-shop-stat-revenue'
  },
  serviceInject() {
    return {
      routeService: RouteService,
      RevenueService: RevenueService
    }
  },
  rxState() {
    return {
      query: this.routeService.query$,
      loading: this.RevenueService.loading$,
      list: this.RevenueService.list$,
      page: this.RevenueService.page$
    }
  },
  data() {
    return {}
  },
  computed: {
    columns
  },
  components: { RecentRadioGroup },
  methods: {
    getList() {},
    recentChange(query) {
      this.RevenueService.getRevenueShopList(query).subscribe()
    }
  }
}
</script>
