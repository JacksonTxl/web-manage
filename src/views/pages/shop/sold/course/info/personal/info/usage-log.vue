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
      <template slot="operate_object" slot-scope="text, record">
        <span v-if="text.length === 0">{{ record.object }}</span>
        <div v-else>
          <a-popover title="操作对象">
            <template slot="content">
              <pre>{{ record.object }}</pre>
            </template>
            <a class="pop-object__text">{{ text }}</a>
          </a-popover>
        </div>
      </template>
      <template slot="before_operate" slot-scope="text, record">
        <span v-if="text.length === 0">{{ record.before }}</span>
        <div v-else>
          <a-popover title="操作前">
            <template slot="content">
              <pre>{{ record.before }}</pre>
            </template>
            <a class="pop__text">{{ text }}</a>
          </a-popover>
        </div>
      </template>
      <template slot="after_operate" slot-scope="text, record">
        <span v-if="text.length === 0">{{ record.after }}</span>
        <div v-else>
          <a-popover title="操作后">
            <template slot="content">
              <pre>{{ record.after }}</pre>
            </template>
            <a class="pop__text">{{ text }}</a>
          </a-popover>
        </div>
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
  computed: {
    columns
  },
  methods: {
    moment
  }
}
</script>
