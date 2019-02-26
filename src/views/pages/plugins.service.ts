import { StRouteGuard, StRoute } from '@/types/route'

class PluginsService implements StRouteGuard {
  beforeRouteEnter(to: StRoute, from: StRoute, next: Function) {
    next()
  }
}

export const pluginsService = new PluginsService()
