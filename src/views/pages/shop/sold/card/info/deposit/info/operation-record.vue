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
      <template slot="operate_object" slot-scope="text, record">
        <st-overflow-text
          title="操作对象"
          :value="record.operate_object"
          maxWidth="100px"
        ></st-overflow-text>
      </template>
      <template slot="before_operate" slot-scope="text, record">
        <st-overflow-text
          title="操作前"
          :value="record.before_operate"
          maxWidth="100px"
        ></st-overflow-text>
      </template>
      <template slot="after_operate" slot-scope="text, record">
        <st-overflow-text
          title="操作后"
          :value="record.after_operate"
          maxWidth="100px"
        ></st-overflow-text>
      </template>
    </st-table>
  </section>
</template>
<script>
import { OperationRecordService } from './operation-record.service'
import { columns } from './operation-record.config'
import tableMixin from '@/mixins/table.mixin'
export default {
  name: 'PageShopSoldCardMemberInfoOperation',
  mixins: [tableMixin],
  serviceInject() {
    return {
      operationRecordService: OperationRecordService
    }
  },
  rxState() {
    return {
      page: this.operationRecordService.page$,
      list: this.operationRecordService.list$,
      loading: this.operationRecordService.loading$
    }
  },
  computed: {
    columns
  }
}
</script>
