import { get } from 'lodash-es'
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
