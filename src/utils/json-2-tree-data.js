/**
 * json 数据转 tree
 */
export function json2AntDesignTreeData(list, opts = {}) {
  const { filterKey } = opts
  return list.map(item => {
    for (let i in item) {
      if (typeof item[i] === 'number') {
        if (i === filterKey) {
          item.key = `${filterKey}#${item[i]}`
        } else {
          item.key = item[i]
        }
        delete item[i]
      }
      if (typeof item[i] === 'string') {
        item.title = item[i]
        delete item[i]
      }
      if (item[i] instanceof Array) {
        item.children = item[i]
        delete item[i]
        item.children = json2AntDesignTreeData(item.children, opts)
      }
    }
    return item
  })
}
