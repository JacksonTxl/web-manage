import container from '@/container'
import { ExportService } from '@/services/export.service'
import { Modal } from 'ant-design-vue'

export default function exportExcelDirective(el: HTMLElement, val: any) {
  const exportService = container.get(ExportService)
  if (!val.value.type) {
    throw new Error('error: type is necessary')
  }
  el.onclick = function() {
    Modal.confirm({
      title: '是否确认导出?',
      onOk: function() {
        exportService.export(val.value.type, val.value.query).subscribe()
      }
    })
  }
}
