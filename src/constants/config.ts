import { getAppEnv } from '@/utils/env.ts'

export class AppConfig {
  /**
   * token名称
   */
  TOKEN_NAME = 'saas-token'
  /**
   * API请求基路径
   */
  API_BASE = '/_api'
  /**
   * global ajax request timeout
   */
  HTTP_TIMEOUT = 60000
  /**
   * easy mock 路径
   * @see https://www.easy-mock.com/project/5c77a2c8df6f65489b3c3308
   */
  API_BASE_MOCK =
    'https://mock.styd.cn/mock/5ca41bca1b15c5002090e2e4/v1'
  /**
   * 图片基础路径
   */
  get HOST_IMAGE() {
    const env = getAppEnv()
    const HOSTS: any = {
      dev: '//styd-saas-test.oss-cn-shanghai.aliyuncs.com'
    }
    return HOSTS[env] || ''
  }

  /**
   * 应用根基路径
   */
  BASE_URL = process.env.BASE_URL

  /**
   * 本地开发api环境
   */
  LOCAL_API_ENV = process.env.LOCAL_API_ENV
  /**
   * 应用环境
   */
  NODE_ENV = process.env.NODE_ENV
  IS_DEV = this.NODE_ENV === 'development'
  IS_PROD = this.NODE_ENV === 'production'
  /**
   * 应用git相关信息 通过 vue.config.js中注入
   */
  GIT_COMMIT = process.env.GIT_COMMIT
  GIT_MESSAGE = process.env.GIT_MESSAGE
  GIT_DATE = process.env.GIT_DATE
  /**
   * html 产出的files相关配置
   */
  // @ts-ignore
  HTML_WEBPACK_FILES = window.htmlWebpackFiles
  /**
   * cropper 默认配置参数
   */
  CROPPER_DEFAULT_CONFIG = {
    viewMode: 1,
    aspectRatio: 16 / 9,
    preview: '#crop_preview',
    // responsive 在调整窗口大小的时候重新渲染 cropper，默认为 true
    responsive: false,
    // 是否允许拖动图片
    movable: false,
    // The minimum width of the crop box
    minCropBoxWidth: 100
  }
  /**
   * map key
   */
  QQ_MAP_KEY = 'ZEGBZ-46CK6-6NCSC-M63GX-L7JGJ-XWB2D'
  /**
   * map location key
   */
  QQ_LOCATION_KEY = 'OMWBZ-VTT3X-ZS34Z-7GDQ6-S6QTJ-ZVBWS'
  /**
   * 日期时间格式
   */
  get DATE_FORMAT() {
    return {
      date: 'YYYY-MM-DD',
      datetime: 'YYYY-MM-DD HH:mm',
      time: 'HH:mm'
    }
  }
  /**
   * 占位图
   */
  PLACEHOLDER_IMG = {
    VERSION: '1.0.0',
    AVATAR: 'https://styd-frontend.oss-cn-shanghai.aliyuncs.com/images/placeholder-avatar.png',
    PICTURE: 'https://styd-frontend.oss-cn-shanghai.aliyuncs.com/images/placeholder-img.png',
    NODATA: 'https://styd-frontend.oss-cn-shanghai.aliyuncs.com/images/placeholder-nodata.png'
  }
}
