<template>
  <div>
    <st-panel app class="mg-b24">
      <Header :id="query.id" />
    </st-panel>
    <st-panel app>
      <div :class="bPage()">
        <st-table
          :page="page"
          @change="onTableChange"
          :loading="loading.getPrizedList"
          :columns="columns"
          :dataSource="list"
          rowKey="id"
        ></st-table>
      </div>
    </st-panel>
  </div>
</template>
<script>
import { PrizeService } from './prize.service'
import { columns } from './prize.config.ts'
import tableMixin from '@/mixins/table.mixin'
import Header from './components#/header'
import { RouteService } from '@/services/route.service'

export default {
  name: 'PluginLotteryInfoPrize',
  mixins: [tableMixin],
  data() {
    return {}
  },
  bem: {
    bPage: 'brand-marketing-plugin-lottery-info-prize'
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
  components: {
    Header
  },
  computed: {
    columns
  }
}
</script>
