import { Injectable } from 'vue-service-app'
import moment from 'moment'

/**
 * 日期处理过滤器集合
 */
@Injectable()
export class DateFilters {
  /**
   * 日期格式化
   */
  dateFilter(key: string | number, format: string) {
    return moment(key).format(format)
  }
}
