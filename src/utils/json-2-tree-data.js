/**
 * json 数据转 AntDesign tree
 * @param {Array} list
 * @param {Object} opts
 * @param {Number} n
 */
export function json2AntDesignTreeData(list, opts = {}, n = 0) {
  const defaultOpts = {
    keyRegExp: /^\d+$/,
    keyName: ''
  }
  opts = Object.assign(defaultOpts, opts)
  return list.map(item => {
    let _n = n
    let isLeaf = true
    const { keyRegExp, keyName } = opts
    for (let i in item) {
      console.log(item[i])
      if (keyName) {
        item.key = item[keyName]
      } else {
        if (keyRegExp.test(item[i])) {
          item.key = item[i]
        } else {
          item.key = item.id
        }
      }

      if (typeof item[i] === 'string') {
        item.title = item[i]
      }
      if (item[i] instanceof Array) {
        isLeaf = false
        item.children = item[i]
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
