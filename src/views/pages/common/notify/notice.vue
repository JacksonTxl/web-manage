<template>
  <div :class="b()">
    <st-search-panel @search="onSearch" @reset="onSearchReset">
      <st-search-panel-item label="通知类型：">
        <st-search-radio
          v-model="$searchQuery.notify_type"
          :options="noticeTypeOptions$"
        />
      </st-search-panel-item>
    </st-search-panel>

    <st-table
      class="pd-24"
      @change="onTableChange"
      rowKey="id"
      :columns="columns"
      :dataSource="list$"
      :loading="loading$.getList"
      :page="page$"
    ></st-table>
  </div>
</template>

<script>
import { columns } from './notice.config'
import { NoticeService } from './notice.service'
import tableMixin from '@/mixins/table.mixin'

export default {
  name: 'NotifyNotice',
  mixins: [tableMixin],
  bem: {
    b: 'page-notify-Notice'
  },
  serviceInject() {
    return {
      service: NoticeService
    }
  },
  rxState() {
    const { list$, page$, loading$, noticeTypeOptions$ } = this.service
    return { list$, page$, loading$, noticeTypeOptions$ }
  },
  data() {
    return {
      date: null
    }
  },
  computed: {
    columns
  }
}
</script>
