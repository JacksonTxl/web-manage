/**
 * maybe it's an Ctor
 */
export const isCtor = s =>
  s.toString().indexOf('this') > -1 || s.toString().indexOf('class') === 0

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

/**
 * 同步执行函数
 * @param {Array<Function>} fns 函数数组
 */
export const syncRouteGuards = (fns = []) => (to, from) => {
  fns.forEach(fn => {
    fn(to, from)
  })
}
