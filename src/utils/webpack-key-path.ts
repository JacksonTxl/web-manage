/**
 * @param {string} keyPath
 * @description 解析webpack key路径
 * @example
 * var key = './plugin/a/b.vue'
 * parsedKeyPath(key) // => {
 *  ext:'.vue',
 *  name: 'b',
 *  base: 'b.vue',
 *  dir： 'plugin/a',
 *  entry: 'plugin/a/b'
 *  dir_dash:'plugin-a',
 *  entry_dash: 'plugin-a-b'
 * }
 *
 */
export const parse = (keyPath: string) => {
  keyPath = keyPath.slice(2)
  const lastDotIndex = keyPath.lastIndexOf('.')
  const lastSlashIndex = keyPath.lastIndexOf('/')
  let ext = ''
  let dir = ''
  let name = ''
  let base = ''
  let entry = ''
  ext = keyPath.slice(lastDotIndex)
  if (lastSlashIndex > -1) {
    dir = keyPath.slice(0, lastSlashIndex)
  }
  name = keyPath.slice(lastSlashIndex + 1, lastDotIndex)
  base = name + ext
  entry = dir ? dir + '/' + name : name
  return {
    name,
    ext,
    base,
    dir,
    entry,
    dir_dash: dir.replace(/\//g, '-'),
    entry_dash: entry.replace(/\//g, '-')
  }
}
