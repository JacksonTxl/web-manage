/**
 * json 数据转 tree
 */
export function json2AntDesignTreeData(list, opts = {}, n = 0) {
  return list.map(item => {
    let _n = n
    let isLeaf = true
    for (let i in item) {
      if (typeof item[i] === 'number') {
        item.key = item[i]
        // delete item[i]
      }
      if (typeof item[i] === 'string') {
        item.title = item[i]
        // delete item[i]
      }
      if (item[i] instanceof Array) {
        isLeaf = false
        item.children = item[i]
        // delete item[i]
        item.children = json2AntDesignTreeData(item.children, opts, ++_n)
      }
    }
    item.key = JSON.stringify({
      isLeaf,
      key: item.key
    })
    return item
  })
}
