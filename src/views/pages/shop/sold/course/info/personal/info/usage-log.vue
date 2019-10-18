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
      <template slot="usage_type" slot-scope="text, record">
        <span v-if="record.usage_type === USAGE_TYPES.PERSONAL">
          预约私教课
        </span>
        <span v-if="record.usage_type === USAGE_TYPES.CANCEL_PERSONAL">
          取消预约私教课
        </span>
        <span v-if="record.usage_type === USAGE_TYPES.PERSONAL_TEAM">
          预约小团课
        </span>
        <span v-if="record.usage_type === USAGE_TYPES.CANCEL_PERSONAL_TEAM">
          取消预约私教小团课
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
import moment from 'moment'
import { UsageLogService } from './usage-log.service'
import { RouteService } from '@/services/route.service'
import { columns } from './usage-log.config'
import { USAGE_TYPES } from '@/constants/sold/usage'
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
    return {
      USAGE_TYPES
    }
  },
  computed: {
    columns
  },
  methods: {
    moment
  }
}
</script>
