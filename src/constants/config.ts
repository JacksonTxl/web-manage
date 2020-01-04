export class AppConfig {
  /**
   * saas token名称
   */
  SAAS_TOKEN_NAME = 'saas-token'
  /**
   * 提供给第三方（文档中心等）用的 token 名称
   */
  THIRD_PARTY_TOKEN_NAME = 'third-party-token'
  /**
   * cookie 有效期
   */
  COOKIE_EXPIRES = 7
  /**
   * API请求基路径
   */
  API_BASE = '/_api'
  /**
   * global ajax request timeout
   */
  HTTP_TIMEOUT = 6000
  /**
   * 请求后端的app_id字段
   */
  API_APP_ID = '10000'
  /**
   * Get请求缓存白名单
   */
  API_BF_HISTORY_CACHE_WHITE_LIST = [
    '/v1/front/entrance/member/',
    '/v1/front/entrance/options/',
    '/v1/front/cabinet/options/'
  ]
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
  get HOST_IS_LOCAL() {
    return process.env.NODE_ENV === 'development'
  }
  // 域名dev环境
  get HOST_IS_DEV() {
    return location.hostname.includes('dev')
  }
  // 域名test环境
  get HOST_IS_TEST() {
    return location.hostname.includes('test')
  }
  // 域名pre环境
  get HOST_IS_PRE() {
    return location.hostname.includes('pre')
  }
  /**
   * 域名生产环境
   */
  get HOST_IS_PROD() {
    return (
      location.hostname === 'saas.styd.cn' ||
      location.hostname === 'pro.styd.cn'
    )
  }
  /**
   * shs环境 只在域名为生产环境时请求shs正式服务
   */
  get SHS_API_ENV() {
    return this.HOST_IS_PROD ? 'https://shs.styd.cn' : 'https://shs.dev.styd.cn'
  }

  /**
   * 应用环境 开发环境 和 部署的环境
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
   * 图片基础路径
   */
  get HOST_IMAGE() {
    return this.HOST_IS_PROD || this.HOST_IS_PRE
      ? '//styd-saas-public.oss-cn-shanghai.aliyuncs.com'
      : '//styd-saas-test.oss-cn-shanghai.aliyuncs.com'
  }
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
    minCropBoxWidth: 100,
    /**
     * A number between 0 and 1. Define the automatic cropping area size (percentage).
     */
    autoCropArea: 1
  }
  /**
   * map key
   */
  QQ_MAP_KEY = 'ZEGBZ-46CK6-6NCSC-M63GX-L7JGJ-XWB2D'
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
  get UDESK_CONFIG() {
    return this.HOST_IS_PROD ? this.UDESK_CONFIG_PROD : this.UDESK_CONFIG_DEV
  }
  UDESK_CONFIG_DEV = {
    code: '2h23f6f4',
    link: 'https://styd.udesk.cn/im_client/?web_plugin_id=66175',
    config_link: 'https://assets-cli.udesk.cn/im_client/js/udeskApi.js'
  }
  UDESK_CONFIG_PROD = {
    code: '2h23f6f4',
    link: 'https://styd.udesk.cn/im_client/?web_plugin_id=101681',
    config_link: 'https://assets-cli.udesk.cn/im_client/js/udeskApi.js'
  }
  get WEB_SOCKET_DOMAIN() {
    if (this.HOST_IS_LOCAL || this.HOST_IS_DEV) {
      return 'wss://api-saas-test.styd.cn/ws'
    }

    if (this.HOST_IS_TEST) {
      return 'wss://api-saas-test.styd.cn/ws'
    }

    if (this.HOST_IS_PRE) {
      return 'wss://api-saas-pre.styd.cn/ws'
    }

    if (this.HOST_IS_PROD) {
      return 'wss://api-saas.styd.cn/ws'
    }
  }
}
