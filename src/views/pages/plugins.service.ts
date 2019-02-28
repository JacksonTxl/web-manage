import { RouteGuard, ServiceRoute } from 'vue-service-app'

class PluginsService implements RouteGuard {
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: Function) {
    next()
  }
}

export const pluginsService = new PluginsService()
