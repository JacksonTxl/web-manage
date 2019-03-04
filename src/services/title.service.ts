import { RouteGuard, ServiceRoute } from 'vue-service-app'
import { localeService } from './locale.service'
import { State, withNamespace } from 'rx-state/src'
import { combineLatest } from 'rxjs'

const ns = withNamespace('title')
const t = localeService.translate.bind(localeService)

class TitleService implements RouteGuard {
  titleKey$ = new State<string>('title.default', ns('title'))
  title$ = combineLatest(this.titleKey$, localeService.locale$, titleKey => {
    const title = t(titleKey)
    return title
  })
  constructor() {
    this.title$.subscribe(title => {
      document.title = `saas-${title}`
    })
  }
  // 只在路由切换时更新title
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: Function) {
    this.titleKey$.commit(() => to.meta.title)
    next()
  }
}

export const titleService = new TitleService()
