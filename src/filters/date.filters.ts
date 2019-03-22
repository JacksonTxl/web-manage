import moment from 'moment'

/**
 * 日期处理过滤器集合
 */
export const dateFilter = (key: string | number, format: string) => {
  return moment(key).format(format)
}
