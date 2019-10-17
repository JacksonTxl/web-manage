import container from '@/container'
import { ExportService } from '@/services/export.service'
import Vue from 'vue'
import { Modal } from 'ant-design-vue'

Vue.directive('exportExcel', {
  bind: function(el, val, vnode) {
    const exportService = container.get(ExportService)
    el.onclick = function() {
      Modal.confirm({
        title: '是否确认导出?',
        onOk: function() {
          exportService.export(val.value.type, val.value.query).subscribe()
        }
      })
    }
  }
})
// export const exportExcel = () => {
//   bind: (el: any, val: any, vnode: any) => {
//     const exportService = container.get(ExportService)
//     el.onclick = function() {
//       Modal.confirm({
//         title: '是否确认导出?',
//         onOk: function() {
//           exportService.export(val.value.type, val.value.para).subscribe()
//         }
//       })
//     }
//   }
// }
