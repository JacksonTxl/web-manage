import { RouteGuard, ServiceRoute } from 'vue-service-app'
import { localeService } from './locale.service'

class TitleService implements RouteGuard {
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: Function) {
    const title = localeService.translate(to.meta.title)
    document.title = `saas - ${title}`
    next()
  }
}

export const titleService = new TitleService()
