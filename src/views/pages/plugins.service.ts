import { Service, ServiceRoute } from 'vue-service-app'

class PluginsService implements Service {
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: Function) {
    next()
  }
}

export const pluginsService = new PluginsService()
