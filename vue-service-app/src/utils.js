/**
 * maybe it's an Ctor
 */
export const isCtor = s => {
  if (!s) {
    return false
  }
  return (
    s.toString().indexOf('this') > -1 || s.toString().indexOf('class') === 0
  )
}

/**
 * 是否对象
 */
export const isObject = s => typeof s === 'object' && s !== null

/**
 * 是否函数
 */
export const isFn = s => typeof s === 'function'
/**
 * 是否字符串
 */
export const isString = s => typeof s === 'string'

export const isArray = s => Array.isArray(s)

export const last = arr => {
  if (!arr || !arr.length) {
    return null
  }
  return arr[arr.length - 1]
}
