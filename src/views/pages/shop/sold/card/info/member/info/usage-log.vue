<template>
  <section class="st-sold-log-table">
    <st-table
      :page="page"
      :columns="columns"
      :loading="loading.getList"
      rowKey="id"
      @change="onTableChange"
      :dataSource="list"
    >
      <template slot="usage_detail" slot-scope="text, record">
        <span v-for="(item, index) in record.usage_detail" :key="index">
          {{ item }}
          <br />
        </span>
      </template>
      <template slot="amount_change" slot-scope="text, record">
        <span :style="{ color: record.amount_change < 0 ? 'red' : 'green' }">
          {{ record.amount_change }}
        </span>
      </template>
    </st-table>
  </section>
</template>
<script>
import { UsageLogService } from './usage-log.service'
import { RouteService } from '@/services/route.service'
import { columns } from './usage-log.config'

import tableMixin from '@/mixins/table.mixin'
export default {
  name: 'PageShopSoldCardMemberInfoOperation',
  mixins: [tableMixin],
  serviceProviders() {
    return [UsageLogService]
  },
  serviceInject() {
    return {
      routeService: RouteService,
      usageLogService: UsageLogService
    }
  },
  rxState() {
    return {
      page: this.usageLogService.page$,
      list: this.usageLogService.list$,
      loading: this.usageLogService.loading$,
      query: this.routeService.query$
    }
  },
  data() {
    return {}
  },
  computed: {
    columns
  }
}
</script>
