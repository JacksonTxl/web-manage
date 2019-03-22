import { State, withNamespace, getState, complete } from 'rx-state'
import Cookie from 'js-cookie'
import { Injectable, OnInit } from 'vue-service-app'
import { AppConfig } from '@/constants/config'
import { Observable, Subject, interval } from 'rxjs'

const ns = withNamespace('ThemeService')

type Theme = 'default' | 'blue' | 'green' | 'pink'

@Injectable()
export class ThemeService implements OnInit {
  /**
   *  当前主题
   */
  theme$: State<Theme>
  /**
   * 可选主题
   */
  themeOptions$: State<Theme[]>
  constructor(private appConfig: AppConfig) {
    this.theme$ = new State(Cookie.get('theme') || '', ns('theme$'))
    this.themeOptions$ = new State(['default', 'pink'], ns('themeOptions$'))
    this.theme$.subscribe(theme => {
      Cookie.set('theme', theme)
    })
  }
  SET_THEME(theme: Theme) {
    if (getState(this.themeOptions$).includes(theme)) {
      this.theme$.commit(() => theme)
    } else {
      console.warn('should change a theme in themeOptions')
    }
  }
  private createThemeLink(theme: string) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.setAttribute('data-theme', theme)
    link.href = `${
      this.appConfig.BASE_URL
    }themes/${theme}.css?${new Date().getTime()}`
    return link
  }
  changeTheme(theme: Theme) {
    if (theme === getState(this.theme$)) {
      return complete()
    }
    const subject$ = new Subject()
    const appendedTheme = document.querySelector('[data-theme]')
    if (appendedTheme) {
      document.head.removeChild(appendedTheme)
    }
    const link = this.createThemeLink(theme)
    document.head.appendChild(link)
    link.onload = () => {
      subject$.complete()
    }
    return subject$
  }
  initTheme() {
    const theme = getState(this.theme$)
    if (!theme || theme === 'default') {
      return complete()
    }
    const init$ = new Subject()
    const link = this.createThemeLink(theme)
    document.head.appendChild(link)
    link.onload = () => {
      init$.complete()
    }
    return init$
  }
  onInit(next: any) {
    this.initTheme().subscribe(() => {
      next()
    })
  }
}
