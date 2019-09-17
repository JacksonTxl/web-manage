<template>
  <div>
    <st-panel app class="mg-b24">
      <Header :activity_id="query.activity_id" />
    </st-panel>
    <router-view></router-view>
  </div>
</template>
<script>
import { InfoService } from './info.service'
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
      infoService: InfoService,
      routeService: RouteService
    }
  },
  rxState() {
    return {
      query: this.routeService.query$,
      list: this.infoService.list$,
      page: this.infoService.page$,
      loading: this.infoService.loading$
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
