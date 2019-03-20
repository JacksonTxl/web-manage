import { AppConfig } from '@/constants/config'

import avatarDefault from '@/assets/img/avatar_default.png'
import { Injectable } from 'vue-service-app'

interface ImgFilterOptions {
  w?: string | number
  h?: string | number
}
/**
 * 资源类过滤器集合
 */
@Injectable()
export class ResourceFilters {
  constructor(private appConfig: AppConfig) {}
  /**
   * 图片资源过滤器
   */
  imgFilter(key: string, options: ImgFilterOptions): string {
    let imgUrl = `${this.appConfig.HOST_IMAGE}/${key}`
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
  avatarFilter(key: string, options: ImgFilterOptions): string {
    return this.imgFilter(key, options) || avatarDefault
  }
}
