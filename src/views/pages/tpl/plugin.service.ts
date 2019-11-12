import { Controller, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state'

// 页面配置title route-map.config.ts
export class PluginService implements Controller {
  shopList$ = new State([])
  constructor() {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    // 判断路由为tpl-plugin时动态跳转到子页面
    if (to.name === 'tpl-plugin') {
      next({
        name: 'tpl-plugin-index'
      })
    } else {
      next()
    }
  }
}
