import { forEach } from 'lodash-es'
import { listToMap } from '@/utils/list-to-map'

/**
 * 将数组列表转换为树列表
 * @param { Array<Object> } list
 * @param { stirng } keyField 指定键名字段
 * @param { stirng } parentField 指定父级字段
 * @param { stirng } childrenField 指定孩子节点字段
 * @return {Array}
 * @example
 *
 * const arr = [{id:1,name:'a', parent_id:'0'},{id:2,name:'b',parent_id:1},{id:3,name:'c,parent_id:2}]
 * listToTree(arr) =>
 * [{
 *    id:1,
 *    name:'a',
 *    children:[
 *      {
 *          id:2,
 *          name:'b',
 *          children:[{id:3,name:"c"}]
 *      }
 *    ]
 * }]
 *
 */

export const listToTree = (
  list,
  {
    keyField = 'id',
    parentField = 'parent_id',
    childrenField = 'children',
    isLeafField = 'isLeaf',
    isParentField = 'isParent'
  } = {}
) => {
  const map = listToMap(list, { keyField })
  const tree = []
  forEach(list, item => {
    // parentId
    const parentId = item[parentField]
    item[isLeafField] = true
    item.key = item.id
    item.title = item.name
    item.scopedSlots = { title: 'title' }
    // 自己是子节点时
    if (parentId && map[parentId]) {
      const parent = map[parentId]
      parent[childrenField] = parent[childrenField] || []
      // 当父级不存在该子节点时
      if (parent[childrenField].indexOf(item) === -1) {
        parent[childrenField].push(item)
        parent[isLeafField] = false
        parent[isParentField] = true
      }
      // 自己是根节点时
    } else {
      tree.push(item)
    }
  })
  return tree
}
