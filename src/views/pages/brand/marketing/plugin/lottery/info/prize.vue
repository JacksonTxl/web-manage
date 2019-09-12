<template>
  <st-panel app>
    <st-table
      :page="page"
      @change="onTableChange"
      :loading="loading.getPrizedList"
      :columns="columns"
      :dataSource="list"
      rowKey="id"
    ></st-table>
  </st-panel>
</template>
<script>
import { PrizeService } from './prize.service'
import { columns } from './prize.config.ts'
import tableMixin from '@/mixins/table.mixin'
import { RouteService } from '@/services/route.service'

export default {
  name: 'PluginLotteryInfoPrize',
  mixins: [tableMixin],
  data() {
    return {}
  },
  serviceInject() {
    return {
      prizeService: PrizeService,
      routeService: RouteService
    }
  },
  rxState() {
    return {
      query: this.routeService.query$,
      list: this.prizeService.list$,
      page: this.prizeService.page$,
      loading: this.prizeService.loading$
    }
  },
  components: {},
  computed: {
    columns
  }
}
</script>
