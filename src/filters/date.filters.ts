import moment from 'moment'

/**
 * 日期处理过滤器集合
 */
export const dateFilter = (
  key: string | number,
  format: string,
  defaultValue: string = ''
) => {
  if (!key) {
    return defaultValue
  }
  return moment(key).format(format)
}
/**
 * @param key 根据索引返回周几
 */
export const weekFilter = (key: number) => {
  return ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][key]
}
