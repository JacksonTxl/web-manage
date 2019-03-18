import { RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, withNamespace, getState } from 'rx-state'
import Cookie from 'js-cookie'
import { last } from 'lodash-es'

const ns = withNamespace('ThemeService')

type Theme = 'default' | 'blue' | 'green'

export class ThemeService implements RouteGuard {
  isFirst = true
  theme$: State<Theme>
  constructor() {
    this.theme$ = new State(Cookie.get('theme') || 'default', ns('theme'))
    this.theme$.forEach(theme => {
      Cookie.set('theme', theme)
      document.body.setAttribute('theme', theme)
    })
  }
  SET_THEME(theme: Theme) {
    this.theme$.commit(() => theme)
  }
  changeTheme(theme: Theme) {
    const currentTheme = getState(this.theme$)
    if (theme === currentTheme && !this.isFirst) {
      return Promise.resolve()
    }
    const themeEl = document.getElementById(`theme-${theme}`)
    if (themeEl) {
      document.head.appendChild(themeEl)
      return Promise.resolve()
    }
    return import(`@/style/themes/${theme}.less`).then(() => {
      const lastHeadEl = last(document.head.children)
      if (lastHeadEl) {
        lastHeadEl.id = `theme-${theme}`
      }
      this.SET_THEME(theme)
    })
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    console.log('themeService start')
    if (this.isFirst) {
      console.log('themeService changeTheme')
      const currentTheme = getState(this.theme$)
      this.changeTheme(currentTheme).then(() => {
        this.isFirst = false
        next()
      })
    } else {
      next()
    }
  }
}
