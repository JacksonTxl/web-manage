import { RouteGuard, ServiceRoute } from 'vue-service-app'
import { localeService, LocaleService } from './locale.service'
import { State, withNamespace } from 'rx-state/src'
import { combineLatest, Observable } from 'rxjs'

const ns = withNamespace('title')

class TitleService implements RouteGuard {
  locale: LocaleService
  titleKey$: State<string>
  title$: Observable<string>
  constructor(locale: LocaleService) {
    this.locale = localeService
    this.titleKey$ = new State('title.default', ns('titleKey'))
    this.title$ = combineLatest(
      this.titleKey$,
      this.locale.locale$,
      titleKey => {
        const title = this.locale.translate(titleKey)
        return title
      }
    )
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

export const titleService = new TitleService(localeService)
