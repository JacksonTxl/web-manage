/**
 * 获取 saas 环境 dev/prod
 */
export function getAppEnv() {
  const { origin } = location
  const envRegExps = {
    dev: /localhost|dev/
  }
  if (envRegExps.dev.test(origin)) {
    return 'dev'
  } else {
    return ''
  }
}
