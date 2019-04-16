import { get } from 'lodash-es'

export const enumFilter = (key: string, enumMap: any) => {
  return get(enumMap.value, key)
}
