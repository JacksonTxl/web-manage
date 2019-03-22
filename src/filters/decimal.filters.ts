/**
 * 数字相关处理过滤器集合
 */
/**
 * 转为百分号的格式
 */
export const percentFilter = (key: string | number) => {
  return Number(key) * 100 + '%'
}
