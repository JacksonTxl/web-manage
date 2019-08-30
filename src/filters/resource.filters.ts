import { AppConfig } from '@/constants/config'
import { isSupportWebp } from '@/utils/support.ts'
import defaultPlaceholderImage from '@/assets/img/placeholder.png'
import container from '@/container'

const appConfig = container.get(AppConfig)
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
  /**
   *  图片类型 会决定默认占位图
   */
  type?: 'course' | 'card' | 'avatar'
  [propName: string]: any
}

/**
 * 图片资源过滤器
 */
export const imgFilter = (key: string, opts?: ImgFilterOptions): string => {
  if (!key) {
    return defaultPlaceholderImage
  }

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
  const ossUrl = `${key}?x-oss-process=image/resize${processConfigStr}${
    isSupportWebp() ? '/quality,q_99/format,webp' : ''
  }`
  return ossUrl
}
