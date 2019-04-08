import { BEMBlock } from 'bem-helpers'

export function mapBem(bemOptions: any = {}) {
  if (typeof bemOptions !== 'object') {
    console &&
      console.warn(
        '[bem] bemOptions should be object but got ',
        typeof bemOptions
      )
  }
  let bemMethods: any = {}
  for (let methodName in bemOptions) {
    bemMethods[methodName] = BEMBlock(bemOptions[methodName])
  }
  return bemMethods
}
