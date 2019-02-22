import { BeforeRouteEnter } from '@/types'

class PluginsService implements BeforeRouteEnter {
  beforeRouteEnter(to, from, next) {
    console.log('this is plugins.service')
    next()
  }
}

export const pluginsService = new PluginsService()
