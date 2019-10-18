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
      <template slot="usage_type" slot-scope="text, record">
        <span>
          {{
            record.usage_type === USAGE_TYPES.ENTRANCE
              ? '入场'
              : record.usage_type === USAGE_TYPES.ORDER
              ? '预约团体课'
              : '取消预约团体课'
          }}
        </span>
        <div>
          <span>课程名称:</span>
          <span>{{ record.course_name }}</span>
        </div>
        <div>
          <span>上课时间:</span>
          <span>
            {{ record.course_start_time }}-- {{ record.course_end_time }}
          </span>
        </div>
        <div>
          <span>上课教练:</span>
          <span>{{ record.coach_name }}</span>
        </div>
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
import { USAGE_TYPES } from '@/constants/sold/usage'

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
    return {
      USAGE_TYPES
    }
  },
  computed: {
    columns
  }
}
</script>
