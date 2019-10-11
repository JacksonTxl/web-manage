<template>
  <st-panel app>
    <st-table
      @change="onTableChange"
      rowKey="id"
      :columns="columns"
      :dataSource="list$"
      :loading="loading$.getLogList"
    >
      <template slot="export_source" slot-scope="source">
        {{ source }}
      </template>
      <template slot="operate_status" slot-scope="status">
        <!-- <a-badge v-if="status.id === 1" status="success"></a-badge>
        <a-badge v-if="status.id === 3" status="error"></a-badge> -->
        {{ status.name }}
      </template>
      <template slot="operate_type" slot-scope="type">
        {{ type.name }}
      </template>
      <template slot="action" slot-scope="record">
        <st-table-actions>
          <a v-if="record.fail_reason" @click="onOpenFailReason">上传失败</a>
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
import { RouteService } from '@/services/route.service'
import { columns } from './export.config'
import tableMixin from '@/mixins/table.mixin'
export default {
  mixins: [tableMixin],
  serviceInject() {
    return {
      exportService: ExportService,
      routeService: RouteService
    }
  },
  rxState() {
    const { loading$, list$, page$ } = this.exportService
    const { query$ } = this.routeService
    return {
      loading$,
      list$,
      page$,
      query: query$
    }
  },
  data() {
    return {
      currentItem: {}
    }
  },
  computed: {
    columns
  },
  methods: {
    onOpenFailReason(item) {
      console.log(item)
    },
    onDownload(item) {
      this.currentItem = item
      this.exportService.getDownloadUrl(item.id).subscribe(res => {
        window.open(res.down_url)
      })
    }
  }
}
</script>
