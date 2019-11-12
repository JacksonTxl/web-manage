import { RouteConfig } from '@/types/app'

export default {
  'tpl-plugin-index'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '插件模版首页'
    routeConfig.queryOptions = {
      activity_status: {
        type: Number,
        default: -1
      },
      activity_name: {
        type: String
      }
    }
  }
}
