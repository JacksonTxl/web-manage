import { State, Computed } from 'rx-state'
import Cookie from 'js-cookie'
import { Injectable } from 'vue-service-app'
import { AppConfig } from '@/constants/config'
import { pluck, filter } from 'rxjs/operators'
import { Store } from './store'

/**
 *  可用主题
 * */

type Theme = 'club' | 'web'

interface ThemeState {
  /**
   *  当前主题
   */
  theme: Theme
}

@Injectable()
export class ThemeService extends Store<ThemeState> {
  // 可选主题选项
  private themeOptions = ['club']
  state$: State<ThemeState>
  theme$: Computed<Theme>
  constructor(private appConfig: AppConfig) {
    super()
    const initialState = {
      theme: Cookie.get('theme') || 'club'
    }
    this.state$ = new State(initialState)
    this.theme$ = new Computed(
      this.state$.pipe(
        pluck('theme'),
        // 只有在主题状态在主题列表中才更新
        filter(theme => this.themeOptions.includes(theme))
      )
    )
  }
  setTheme(theme: Theme) {
    this.state$.commit(state => {
      state.theme = theme
    })
  }
}
