<template>
  <section class="page-personal-info-log">
    <st-table
      :pagination="{
        current: query.page,
        total: page.total_counts,
        pageSize: query.size
      }"
      :columns="columns"
      @change="onPageChange"
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
import { OperationRecordService } from './operation-record.service'
import { RouteService } from '@/services/route.service'
import { columns } from './operation-record.config'
export default {
  name: 'PageShopSoldCoursePersonalInfoOperation',
  bem: {
    basic: 'page-shop-sold'
  },
  serviceInject() {
    return {
      routeService: RouteService,
      operationRecordService: OperationRecordService
    }
  },
  rxState() {
    return {
      page: this.operationRecordService.page$,
      list: this.operationRecordService.list$,
      loading: this.operationRecordService.loading$,
      query: this.routeService.query$
    }
  },
  computed: {
    columns
  },
  methods: {
    moment,
    onPageChange(data) {
      this.$router.push({
        query: { ...this.query, page: data.current, size: data.pageSize }
      })
    }
  }
}
</script>
