import { BeforeRouteEnter, StRoute } from '@/types'

class PluginsService implements BeforeRouteEnter {
  beforeRouteEnter(to: StRoute, from: StRoute, next: Function) {
    console.log('this is plugins.service')
    next()
  }
}

export const pluginsService = new PluginsService()
