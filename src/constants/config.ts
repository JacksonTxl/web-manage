export const appConfig = {
  /**
   * token名称
   */
  TOKEN_NAME: 'saas-token',
  /**
   * API请求基路径
   */
  API_BASE: '/_api',
  /**
   * easy mock 路径
   * @see https://www.easy-mock.com/project/5c77a2c8df6f65489b3c3308
   */
  API_BASE_MOCK: 'https://www.easy-mock.com/mock/5c77a2c8df6f65489b3c3308/web',
  /**
   * 图片基础路径
   */
  HOST_IMAGE: '//pic3-s.styd.cn',

  /**
   * 应用根基路径
   */
  BASE_URL: process.env.BASE_URL,
  /**
   * 应用环境
   */
  NODE_ENV: process.env.NODE_ENV,
  IS_DEV: process.env.NODE_ENV === 'development',
  IS_PROD: process.env.NODE_ENV === 'production',
  /**
   * 应用git相关信息 通过 vue.config.js中注入
   */
  GIT_COMMIT: process.env.GIT_COMMIT,
  GIT_MESSAGE: process.env.GIT_MESSAGE,
  GIT_DATE: process.env.GIT_DATE
}
