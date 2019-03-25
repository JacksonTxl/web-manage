import { AppConfig } from '@/constants/config'
import avatarDefault from '@/assets/img/avatar_default.png'
/**
 * 资源类过滤器集合
 */

interface ImgFilterOptions {
  w?: string | number
  h?: string | number
}

// @ts-ignore
const appConfig = appContainer.get(AppConfig)

/**
 * 图片资源过滤器
 */
export const imgFilter = (key: string, options: ImgFilterOptions): string => {
  let imgUrl = `${appConfig.HOST_IMAGE}/${key}`
  let imageView = ''

  if (options.w) {
    imageView += `/w/${options.w}`
  }
  if (options.h) {
    imageView += `/h/${options.h}`
  }
  if (imageView) {
    imgUrl = imgUrl + '?imageView2/1' + imageView
  }
  return imgUrl
}

/**
 * 头像类过滤器
 */
export function avatarFilter(key: string, options: ImgFilterOptions): string {
  return imgFilter(key, options) || avatarDefault
}
