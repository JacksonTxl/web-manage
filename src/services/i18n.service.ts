import { State, withNamespace, getState } from 'rx-state'
import { map } from 'rxjs/operators'
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

const ns = withNamespace('i18nService')
// type reference https://vue.ant.design/docs/vue/i18n/
type Language = 'zh_CN' | 'en_US'

interface Locale {
  antd: {}
  app: {}
}

@Injectable()
export class I18NService {
  language$: State<Language>
  locale$: Observable<Locale>
  appLocale$: Observable<{}>
  antdLocale$: Observable<{}>
  constructor() {
    const defaultLan = Cookie.get('language') || 'zh_CN'

    this.language$ = new State(defaultLan, ns('language'))
    this.language$.forEach(language => {
      Cookie.set('language', language)
    })
    this.locale$ = this.language$.pipe(
      map(language => {
        if (language === 'zh_CN') {
          return {
            antd: zh_CN_Antd,
            app: zh_CN_App
          }
        }
        if (language === 'en_US') {
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
    this.appLocale$ = this.locale$.pipe(map(locale => locale.app))
    this.antdLocale$ = this.locale$.pipe(map(locale => locale.antd))
  }
  setLanguage(language: Language) {
    this.language$.commit(() => language)
  }
  translate(appMsgKey: string) {
    const appMessages = getState(this.appLocale$)
    const text = get(appMessages, appMsgKey)
    if (!text) {
      console.warn(
        `i18nService can not translate [${appMsgKey}],are you declared?`
      )
    }
    return text
  }
}
