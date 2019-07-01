/**
 * 销售金额过滤器
 * 0 -> 0
 * 256 -> 256
 * 2500 -> 2.5K
 * 25000 -> 2.5万
 */
export const toKFilter = v => {
  v = Number(v)
  if (!v) {
    return 0
  }
  const T1 = Math.pow(10, 3)
  const T2 = Math.pow(10, 4)

  if (v >= T2) {
    return (v / T2).toFixed(1).replace('.0', '') + '万'
  }
  if (v >= T1 && v) {
    return (v / T1).toFixed(1).replace('.0', '') + 'k'
  }
  if (v >= 0) {
    return v
  }
}

/**
 * 千分位过滤器
 */
export const thousandsFilter = (v, fixed = 2) => {
  const result = Number(v)
    .toFixed(fixed)
    .replace(/\B(?=(?:\d{3})+\b)/g, ',')
  return result
}
