<template>
  <st-panel app>
    <div :class="bPage()">
      <st-table
        :page="page"
        @change="onTableChange"
        :loading="loading.getUserList"
        :columns="columns"
        :dataSource="list"
        rowKey="id"
      ></st-table>
    </div>
  </st-panel>
</template>
<script>
import { PrizeService } from './user.service'
import { columns } from './user.config.ts'
import tableMixin from '@/mixins/table.mixin'

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
