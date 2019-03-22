import { State, withNamespace, getState } from 'rx-state'
import Cookie from 'js-cookie'
import { ServiceRoute, Injectable } from 'vue-service-app'
import { AppConfig } from '@/constants/config'

const ns = withNamespace('ThemeService')

type Theme = 'default' | 'blue' | 'green'

@Injectable()
export class ThemeService {
  isFirst = true
  theme$: State<Theme>
  constructor(private appConfig: AppConfig) {
    this.theme$ = new State(Cookie.get('theme') || '', ns('theme'))
    this.theme$.subscribe(theme => {
      Cookie.set('theme', theme)
      document.body.setAttribute('theme', theme)
    })
  }
  SET_THEME(theme: Theme) {
    this.theme$.commit(() => theme)
  }
  loadTheme(theme: Theme) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = `${
      this.appConfig.BASE_URL
    }themes/${theme}.css?${new Date().getTime()}`
    document.head.appendChild(link)
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.loadTheme(getState(this.theme$))
    next()
  }
}
