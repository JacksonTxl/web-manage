import { Injectable } from 'vue-service-app'

/**
 * 售出统一处理的service
 */
@Injectable()
export class SoldService {
  dealData(arr: []) {
    arr.map((item: any) => {
      item.after =
        item.after_operate.length === 0 ? '--' : item.after_operate.join('\r\n')
      item.before =
        item.before_operate.length === 0
          ? '--'
          : item.before_operate.join('\r\n')
      item.object =
        item.operate_object.length === 0
          ? '--'
          : item.operate_object.join('\r\n')
      item.operate_object = item.operate_object.join('')
      item.before_operate = item.before_operate.join('')
      item.after_operate = item.after_operate.join('')
      return item
    })
    return arr
  }
}
