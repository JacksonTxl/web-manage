import { RouteGuard, ServiceRoute } from 'vue-service-app'
import { localeService } from './locale.service'
import { State, withNamespace } from 'rx-state/src'
import { combineLatest } from 'rxjs'

const ns = withNamespace('title')
class TitleService implements RouteGuard {
  titleKey$ = new State<string>('', ns('title'))
  title$ = combineLatest(this.titleKey$, localeService.locale$, titleKey => {
    const title = localeService.translate(titleKey)
    return title
  })
  constructor() {
    this.title$.subscribe(title => {
      document.title = `saas-${title}`
    })
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: Function) {
    this.titleKey$.commit(() => to.meta.title)
    next()
  }
}

export const titleService = new TitleService()
