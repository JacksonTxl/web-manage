import { State, Computed } from 'rx-state'
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

@Injectable()
export class I18NService {
  locale$ = new State<Locale>(Cookie.get('language') || 'zh_CN')
  antdLocaleMessages$: Computed<{}>
  appLocaleMessages$: Computed<{}>
  constructor() {
    this.appLocaleMessages$ = new Computed(
      this.locale$.pipe(
        map(locale => {
          if (locale === 'zh_CN') {
            return zh_CN_App
          }
          if (locale === 'en_US') {
            return en_US_App
          }
          return {}
        })
      )
    )
    this.antdLocaleMessages$ = new Computed(
      this.locale$.pipe(
        map(locale => {
          if (locale === 'zh_CN') {
            return zh_CN_Antd
          }
          if (locale === 'en_US') {
            return en_US_Antd
          }
          return {}
        })
      )
    )
  }
  setLocale(locale: Locale) {
    this.locale$.commit(() => locale)
  }
  private getText(messages: any, index: string) {
    const text = get(messages, index) || ''
    if (!text) {
      // console.warn(`i18nService can not translate [${index}],are you declared?`)
    }
    return text
  }
  /**
   * @param appMsgKey 翻译key
   * @example
   * this.i18n.translate('app.title')
   */
  translate(appMsgKey: string) {
    return this.getText(this.appLocaleMessages$.snapshot(), appMsgKey)
  }
  t(appMsgKey: string): string {
    return this.translate(appMsgKey)
  }
  /**
   * 通过关键字返回指定的文本的流
   * @param appMsgKey 翻译key
   * @example
   * this.i18n.t$('app.title') => title$
   */
  t$(appMsgKey: string): Observable<string> {
    return this.appLocaleMessages$.pipe(
      map(appMessages => {
        return this.getText(appMessages, appMsgKey)
      })
    )
  }
}
