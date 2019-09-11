<template>
  <div>
    <st-panel app class="mg-b24">
      <Header :id="query.id" />
    </st-panel>
    <router-view></router-view>
  </div>
</template>
<script>
import { PrizeService } from './info/prize.service'
import { columns } from './info/prize.config.ts'
import tableMixin from '@/mixins/table.mixin'
import Header from './info/components#/header'
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
  components: {
    Header
  },
  computed: {
    columns
  }
}
</script>
