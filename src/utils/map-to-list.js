import { map } from 'lodash-es'
/**
 * map 对象转换为list数组
 * @param {Object} mapData
 * @return {Array<Object>}
 */
export const mapToList = (mapData = {}) => {
  return map(mapData, item => item)
}
