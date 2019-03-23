import { State, getSnapshot } from 'rx-state'
import { map, pluck } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { Injectable } from 'vue-service-app'
import { get } from 'lodash-es'
import Cookie from 'js-cookie'
// @ts-ignore
import zh_CN_Antd from 'ant-design-vue/lib/locale-provider/zh_CN'
// @ts-ignore
import en_US_Antd from 'ant-design-vue/lib/locale-provider/en_US'
// @ts-ignore
import zh_CN_App from '@/i18n/zh_CN'
// @ts-ignore
import en_US_App from '@/i18n/en_US'

// type reference https://vue.ant.design/docs/vue/i18n/
type Locale = 'zh_CN' | 'en_US'

interface LocaleMessages {
  antd: {}
  app: {}
}
interface I18NState {
  locale: Locale
  localeMessages: LocaleMessages
}

@Injectable()
export class I18NService {
  state$: State<I18NState>
  locale$: Observable<Locale>
  localeMessages$: Observable<LocaleMessages>
  antdLocaleMessages$: Observable<{}>
  appLocaleMessages$: Observable<{}>
  constructor() {
    const initialState = {
      locale: Cookie.get('language') || 'zh_CN'
    }
    this.state$ = new State(initialState, 'I18NService.state$')
    this.locale$ = this.state$.pipe(pluck('locale'))
    this.localeMessages$ = this.state$.pipe(
      pluck('locale'),
      map(locale => {
        if (locale === 'zh_CN') {
          return {
            antd: zh_CN_Antd,
            app: zh_CN_App
          }
        }
        if (locale === 'en_US') {
          return {
            antd: en_US_Antd,
            app: en_US_App
          }
        }
        return {
          antd: {},
          app: {}
        }
      })
    )
    this.appLocaleMessages$ = this.localeMessages$.pipe(pluck('app'))
    this.antdLocaleMessages$ = this.localeMessages$.pipe(pluck('antd'))
  }
  SET_LOCALE(locale: Locale) {
    this.state$.commit(state => {
      state.locale = locale
    })
  }
  get appLocaleMessagesSnapshot() {
    return getSnapshot(this.appLocaleMessages$)
  }
  private getText(messages: any, index: string) {
    const text = get(messages, index) || ''
    if (!text) {
      console.warn(`i18nService can not translate [${index}],are you declared?`)
    }
    return text
  }
  /**
   * @param appMsgKey 翻译key
   * @example
   * this.i18n.translate('app.title')
   */
  translate(appMsgKey: string) {
    return this.getText(this.appLocaleMessagesSnapshot, appMsgKey)
  }
  t(appMsgKey: string) {
    return this.translate(appMsgKey)
  }
  /**
   * 通过关键字返回指定的文本的流
   * @param appMsgKey 翻译key
   * @example
   * this.i18n.t$('app.title') => title$
   */
  t$(appMsgKey: string): Observable<string> {
    return this.appLocaleMessages$.pipe(appMessages => {
      return this.getText(appMessages, appMsgKey)
    })
  }
}
