import { isNil } from 'lodash-es'
import { walkTree } from './walk-tree'
/**
 * 通过tree树结构寻找该id所属于的id路径数组
 * @param { string | number } value 要寻找的值id
 * @param { array } tree 树结构
 */

export const findPathWithTree = (
  value,
  tree = [],
  { keyField = 'id' } = {}
) => {
  if (isNil(value)) {
    return []
  }
  let paths = []
  let finded = false
  walkTree(tree, (node, { depth }) => {
    if (!finded) {
      if (depth === 0) {
        paths = [node[keyField]]
      }
      paths[depth] = node[keyField]
    }
    if (node.id === value) {
      finded = true
    }
  })
  if (!finded) {
    return []
  }
  return paths
}
