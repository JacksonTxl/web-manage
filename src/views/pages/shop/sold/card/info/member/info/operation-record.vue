<template>
  <section class="page-member-info-log pd-x24 pd-y24">
    <st-table
      :page="page"
      :columns="columns"
      :loading="loading.getList"
      rowKey="id"
      @change="onTableChange"
      :dataSource="list"
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
import { OperationRecordService } from './operation-record.service'
import { RouteService } from '@/services/route.service'
import { columns } from './operation-record.config'
import tableMixin from '@/mixins/table.mixin'
export default {
  name: 'PageShopSoldCardMemberInfoOperation',
  mixins: [tableMixin],
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
  }
}
</script>
