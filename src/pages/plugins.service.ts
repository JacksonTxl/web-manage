import { StRouteGuard, StRoute } from '@/types'

class PluginsService implements StRouteGuard {
  beforeRouteEnter(to: StRoute, from: StRoute, next: Function) {
    console.log('this is plugins.service')
    next()
  }
}

export const pluginsService = new PluginsService()
