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
  HTTP_TIMEOUT = 20000
  /**
   * 本地mock
   * 见 mock 文件下app.js
   */
  API_BASE_MOCK = '/_mock_api'
  /**
   * 图片基础路径
   */
  get HOST_IMAGE() {
    return this.HOST_IS_PROD
      ? '//styd-saas-public.oss-cn-shanghai.aliyuncs.com'
      : '//styd-saas-test.oss-cn-shanghai.aliyuncs.com'
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
   * 当前开发使用的页面模式 brand | shop
   */
  PAGE_ENV = process.env.PAGE_ENV

  /**
   * 是否当前的域名处于生产环境
   */
  get HOST_IS_PROD() {
    return location.hostname === 'saas.styd.cn'
  }
  /**
   * shs环境
   */
  get SHS_API_ENV() {
    return this.HOST_IS_PROD ? 'https://shs.styd.cn' : 'https://shs.dev.styd.cn'
  }

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
  GIT_BRANCH = process.env.GIT_BRANCH
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
    AVATAR:
      'https://styd-frontend.oss-cn-shanghai.aliyuncs.com/images/placeholder-avatar.png',
    PICTURE:
      'https://styd-frontend.oss-cn-shanghai.aliyuncs.com/images/placeholder-img.png',
    NODATA:
      'https://styd-frontend.oss-cn-shanghai.aliyuncs.com/images/placeholder-nodata.png',
    LOGO:
      'https://styd-frontend.oss-cn-shanghai.aliyuncs.com/images/logo-default.png'
  }
}
