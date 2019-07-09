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
  /**
   * 裁切模式 lfit|mfit|fill|pad|fixed
   */
  m?: string
  [propName: string]: any
}

const container = window.getContainer()
const appConfig = container.get(AppConfig)

/**
 * 图片资源过滤器
 */
export const imgFilter = (key: string, opts?: ImgFilterOptions): string => {
  if (/x-oss-process/.test(key) || /blob/.test(key)) {
    return key
  }
  if (/^image\//.test(key)) {
    key = appConfig.HOST_IMAGE + '/' + key
  }
  const configs: ImgFilterOptions = {
    interlace: 1,
    m: 'fill'
  }
  let processConfigStr = ''
  if (opts && opts.m) {
    configs.m = opts.m
  }
  if (opts && opts.w) {
    configs.w = opts.w
  }
  if (opts && opts.h) {
    configs.h = opts.h
  }
  if (!opts) {
    return key
  }
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

/**
 * 门店图过滤器
 */
export function shopImgFilter(key: string, options: ImgFilterOptions): string {
  return imgFilter(key, options) || avatarDefault
}

/**
 * 品牌logo过滤器
 */
export function brandLogoFilter(
  key: string,
  options: ImgFilterOptions
): string {
  return imgFilter(key, options) || avatarDefault
}

/**
 * 卡片图片过滤器
 */
export function cardImgFilter(key: string, options: ImgFilterOptions): string {
  return imgFilter(key, options) || avatarDefault
}
