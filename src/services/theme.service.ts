import { State, Computed } from 'rx-state'
import Cookie from 'js-cookie'
import { Injectable } from 'vue-service-app'
import { AppConfig } from '@/constants/config'
import { pluck, filter } from 'rxjs/operators'
import { Store } from './store'

/**
 *  可用主题
 * */

type Theme = 'default' | 'blue' | 'green' | 'pink'

interface ThemeState {
  /**
   *  当前主题
   */
  theme: Theme
}

@Injectable()
export class ThemeService extends Store<ThemeState> {
  // 可选主题选项
  private themeOptions = ['default']
  state$: State<ThemeState>
  theme$: Computed<Theme>
  constructor(private appConfig: AppConfig) {
    super()
    const initialState = {
      theme: Cookie.get('theme') || 'default'
    }
    this.state$ = new State(initialState)
    this.theme$ = new Computed(
      this.state$.pipe(
        pluck('theme'),
        // 只有在主题状态在主题列表中才更新
        filter(theme => this.themeOptions.includes(theme))
      )
    )
    this.theme$.subscribe(theme => {
      Cookie.set('theme', theme)
    })
    this.theme$.subscribe(theme => {
      const linkEl = this.createThemeLink(theme)
    })
  }
  setTheme(theme: Theme) {
    this.state$.commit(state => {
      state.theme = theme
    })
  }
  /**
   * 开发环境使用时间，生产环境使用GIT_COMMIT作为后缀
   */
  private get linkHash() {
    return this.appConfig.IS_DEV
      ? new Date().getTime()
      : this.appConfig.GIT_COMMIT
  }
  private createThemeLink(theme: Theme) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.setAttribute('data-theme', theme)
    link.href = `${this.appConfig.BASE_URL}themes/${theme}.css?${this.linkHash}`
    return link
  }
}
