import { I18NService } from './i18n.service'
import { ServiceRoute, Injectable, RouteGuard } from 'vue-service-app'
import { State } from 'rx-state/src'

@Injectable()
export class TitleService implements RouteGuard {
  title$: State<string>
  constructor(private i18n: I18NService) {
    this.title$ = new State(this.i18n.translate('app.title'))
    this.title$.forEach(title => {
      document.title = title
    })
  }
  SET_TITLE(title: string) {
    this.title$.commit(() => title)
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    console.log('titleService start', to.meta.title)
    const titleIndex: string = to.meta.title
    const titleText =
      this.i18n.translate('app.title') + '-' + this.i18n.translate(titleIndex)
    this.SET_TITLE(titleText)
    next()
  }
}
