<template>
  <st-panel app>
    <st-table
      @change="onTableChange"
      rowKey="id"
      :columns="columns"
      :dataSource="list$"
      :loading="loading$.getLogList"
      :page="page$"
    >
      <template slot="export_source" slot-scope="source">
        {{ source }}
      </template>
      <template slot="operate_status" slot-scope="status">
        <a-badge v-if="status.id === STATUS.SUCCESS" status="success"></a-badge>
        <a-badge v-if="status.id === STATUS.FAIL" status="error"></a-badge>
        {{ status.name }}
      </template>
      <template slot="operate_type" slot-scope="type">
        {{ type }}
      </template>
      <template slot="action" slot-scope="record">
        <st-table-actions>
          <a v-if="record.fail_reason" @click="onOpenFailReason(record)">
            查看原因
          </a>
          <a v-else @click="onDownload(record)">
            下载
          </a>
        </st-table-actions>
      </template>
    </st-table>
  </st-panel>
</template>

<script>
import { ExportService } from './export.service'
import { columns } from './export.config'
import tableMixin from '@/mixins/table.mixin'
import ExportFail from '@/views/biz-modals/common/export-fail'
import { STATUS } from '@/constants/common/export'
export default {
  mixins: [tableMixin],
  modals: {
    ExportFail
  },
  serviceInject() {
    return {
      exportService: ExportService
    }
  },
  rxState() {
    const { loading$, list$, page$ } = this.exportService
    return {
      loading$,
      list$,
      page$
    }
  },
  data() {
    return {
      STATUS,
      currentItem: {}
    }
  },
  computed: {
    columns
  },
  methods: {
    onOpenFailReason(item) {
      this.$modalRouter.push({
        name: 'export-fail',
        props: {
          reason: item.fail_reason
        }
      })
    },
    onDownload(item) {
      this.currentItem = item
      this.exportService.getDownloadUrl(item.id).subscribe(res => {
        if (res.down_url) {
          window.open(res.down_url)
        }
      })
    }
  }
}
</script>
