<template>
  <section class="st-sold-log-table">
    <st-table
      :pagination="{
        current: query.page,
        total: page.total_counts,
        pageSize: query.size
      }"
      :columns="columns"
      @change="onTableChange"
      :loading="loading.getList"
      :dataSource="list"
      rowKey="id"
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
import moment from 'moment'
import { UsageLogService } from './usage-log.service'
import { RouteService } from '@/services/route.service'
import { columns } from './usage-log.config'
import tableMixin from '@/mixins/table.mixin'
export default {
  name: 'PageShopSoldCoursePersonalInfoUsage',
  mixins: [tableMixin],
  bem: {
    basic: 'page-shop-sold'
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
  },
  methods: {
    moment
  }
}
</script>
