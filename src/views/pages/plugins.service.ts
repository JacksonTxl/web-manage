import { ServiceRouter } from 'vue-service-app'

export class PluginsService {
  constructor() {}
  beforeRouteEnter(to: ServiceRouter, from: ServiceRouter, next: any) {
    console.log('pluginsService')
    next()
  }
}
