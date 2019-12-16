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
        return new Promise((resolve, reject) => {
          exportService
            .export(val.value.type, val.value.query)
            .subscribe(() => {
              resolve()
              Modal.success({
                title: '提交成功',
                content(h: any) {
                  return h('div', {}, [
                    '点击',
                    h('a', { attrs: { href: '/common/export' } }, '导出中心'),
                    '可查看导出进度并进行下载操作'
                  ])
                }
              })
            })
        })
      }
    })
  }
}
