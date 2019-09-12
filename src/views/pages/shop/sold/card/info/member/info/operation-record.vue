<template>
  <section class="pd-24">
    <st-table
      :page="page"
      :columns="columns"
      :loading="loading.getList"
      rowKey="id"
      @change="onTableChange"
      :dataSource="list"
    >
      <template slot="operate_object" slot-scope="text">
        <span v-if="text.length === 0">--</span>
        <div v-else>
          <a-popover title="操作人">
            <template slot="content">
              <p v-html="tableText(text)"></p>
            </template>
            <span class="pop__text">{{ text[0] }}...</span>
          </a-popover>
        </div>
      </template>
      <template slot="before_operate" slot-scope="text">
        <span v-if="text.length === 0">--</span>
        <div v-else>
          <a-popover title="操作前">
            <template slot="content">
              <p v-html="tableText(text)"></p>
            </template>
            <span class="pop__text">{{ text[0] }}...</span>
          </a-popover>
        </div>
      </template>
      <template slot="after_operate" slot-scope="text">
        <span v-if="text.length === 0">--</span>
        <div v-else>
          <a-popover title="操作后">
            <template slot="content">
              <p v-html="tableText(text)"></p>
            </template>
            <span class="pop__text">{{ text[0] }}...</span>
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
  },
  methods: {
    tableText(val) {
      console.log('val', val.join('<br/>'))
      if (val.length === 0) return ''
      return val.join('<br/>')
    }
  }
}
</script>
