import { I18NService } from './i18n.service'
import { ServiceRoute, Injectable, RouteGuard } from 'vue-service-app'
import { State } from 'rx-state'

@Injectable()
export class TitleService implements RouteGuard {
  title$ = new State<string>('')
  constructor() {
    this.title$.subscribe(title => {
      document.title = title ? '三体云动 - ' + title : '三体云动'
    })
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.title$.commit(() => to.meta.title)
    next()
  }
}
