<template>
  <div>
    <st-panel app class="mg-b12">
      <Header :id="$searchQuery.id" />
    </st-panel>
    <router-view></router-view>
  </div>
</template>
<script>
import { InfoService } from './info.service'
import { columns } from './info/prize.config.ts'
import tableMixin from '@/mixins/table.mixin'
import Header from './info/components#/header'

export default {
  name: 'PluginLotteryInfoPrize',
  mixins: [tableMixin],
  data() {
    return {}
  },
  serviceInject() {
    return {
      infoService: InfoService
    }
  },
  rxState() {
    return {
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
