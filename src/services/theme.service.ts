import { State, withNamespace } from 'rx-state'
import Cookie from 'js-cookie'

const ns = withNamespace('ThemeService')

type Theme = 'default' | 'blue' | 'green'

export class ThemeService {
  isFirst = true
  theme$: State<Theme>
  constructor() {
    this.theme$ = new State(Cookie.get('theme') || 'default', ns('theme'))
    this.theme$.subscribe(theme => {
      Cookie.set('theme', theme)
      document.body.setAttribute('theme', theme)
    })
  }
  SET_THEME(theme: Theme) {
    this.theme$.commit(() => theme)
  }
}
