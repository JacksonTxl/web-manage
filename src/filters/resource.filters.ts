import { AppConfig } from '@/constants/config'
import avatarDefault from '@/assets/img/avatar_default.png'
import { config } from 'rxjs'
/**
 * 资源类过滤器集合
 * 阿里云oss文档 https://help.aliyun.com/document_detail/44688.html?spm=a2c4g.11186623.6.1285.56ac4663mXIBaR
 */

interface ImgFilterOptions {
  w?: string | number
  h?: string | number
  m?: string
  [propName: string]: any
}

// @ts-ignore
const appConfig = appContainer.get(AppConfig)

/**
 * 图片资源过滤器
 */
export const imgFilter = (key: string, opts: ImgFilterOptions): string => {
  if (/x-oss-process/.test(key)) {
    return key
  }
  console.log('opts', opts)
  const configs: ImgFilterOptions = {
    interlace: 1,
    m: 'mfit'
  }
  let processConfigStr = ''
  if (opts.m) {
    configs.m = opts.m
  }
  if (opts.w) {
    configs.w = opts.w
  }
  if (opts.h) {
    configs.h = opts.h
  }
  console.log('configs', configs)
  for (let i in configs) {
    processConfigStr += `,${i}_${configs[i]}`
  }
  return `${key}?x-oss-process=image/resize${processConfigStr}`
}

/**
 * 头像类过滤器
 */
export function avatarFilter(key: string, options: ImgFilterOptions): string {
  return imgFilter(key, options) || avatarDefault
}
