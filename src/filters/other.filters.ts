import { get, find as lFind } from 'lodash-es'
import { UserService } from '@/services/user.service'

// @ts-ignore
const container = window.appContainer

export const enumFilter = (key: string, path: string) => {
  const user = container.get(UserService)
  const enumObj = user.enums$.snapshot()
  const value = get(enumObj, `${path}.value.${key}`)
  return value || console.error(`【enumFilter】is not found [${path}.${key}] `)
}
export const enumFilterObject = (path: string) => {
  const user = container.get(UserService)
  const enumObj = user.enums$.snapshot()
  const value = get(enumObj, `${path}`)
  return value || console.error(`【enumFilter】is not found [${path}] `)
}

/**
 * 根据枚举选项数组和key值给出label值
 * @param key 索引值
 * @param options 选项
 */
export const statusFilter = (
  key: string,
  options: { label: string; value: number }[] = []
) => {
  const finded = lFind(options, { value: +key }) || { label: '' }
  return finded.label
}
