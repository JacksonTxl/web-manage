/**
 * 通过树对象转换为map对象
 * @param { Array<Object> } treeData
 * @param { string } keyFiled 键名字段
 * @param { string } childrenField 孩子字段
 * @return { Object }
 *
 */

export const treeToMap = (
  treeData = [],
  { keyFiled = 'id', childrenField = 'children' } = {}
) => {
  const map = {}
  const walk = tree => {
    tree.forEach(node => {
      map[node[keyFiled]] = node
      if (node[childrenField] && node[childrenField].length) {
        walk(node[childrenField])
      }
    })
  }

  walk(treeData)
  return map
}
