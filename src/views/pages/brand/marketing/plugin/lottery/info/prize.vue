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

export default {
  name: 'PluginLotteryInfoPrize',
  mixins: [tableMixin],
  data() {
    return {}
  },
  serviceInject() {
    return {
      prizeService: PrizeService
    }
  },
  rxState() {
    return {
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
