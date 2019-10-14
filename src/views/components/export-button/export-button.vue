<template>
  <st-button
    @click="onExport"
    type="primary"
    :loading="loading$.export"
    v-bind="$attrs"
  >
    <slot>导出</slot>
  </st-button>
</template>

<script>
import { ExportButtonService } from './export-button.service'
export default {
  name: 'StExportButton',
  props: {
    /**
     * 类型 传入 /v1/excel/outpu/的后半部分
     */
    type: {
      type: String,
      required: true
    },
    query: {
      type: Object,
      required: true
    }
  },
  serviceInject() {
    return {
      exportButtonService: ExportButtonService
    }
  },
  rxState() {
    const { loading$ } = this.exportButtonService
    return {
      loading$
    }
  },
  methods: {
    onExport() {
      this.exportButtonService.export(this.type, this.query).subscribe()
    }
  }
}
</script>
