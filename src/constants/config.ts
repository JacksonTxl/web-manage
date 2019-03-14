export class AppConfig {
  /**
   * API请求基路径
   */
  API_BASE = '/_api'
  /**
   * easy mock 路径
   * @see https://www.easy-mock.com/project/5c77a2c8df6f65489b3c3308
   */
  API_BASE_MOCK = 'https://www.easy-mock.com/mock/5c77a2c8df6f65489b3c3308/web'
  /**
   * 头像基础路径
   */
  HOST_AVATAR = '//pic1-s.styd.cn'
  /**
   * 图片基础路径
   */
  HOST_IMAGE = '//pic3-s.styd.cn'

  IS_DEV = process.env.NODE_ENV === 'development'
  IS_PROD = process.env.NODE_ENV === 'production'
}
