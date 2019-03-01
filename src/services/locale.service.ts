import { State, getState } from 'rx-state'
import Cookie from 'js-cookie'
import { map } from 'rxjs/operators'
// @ts-ignore
import AntdLocaleZhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
// @ts-ignore
import AntdLocaleEnUS from 'ant-design-vue/lib/locale-provider/en_US'
// @ts-ignore
import AppLocaleZhCN from '@/i18n/zh_CN.js'
// @ts-ignore
import AppLocaleEnUS from '@/i18n/en_US.js'
import { get } from 'lodash-es'

type Locale = 'zh_CN' | 'en_US'
class LocaleService {
  antdLocales = {
    zh_CN: AntdLocaleZhCN,
    en_US: AntdLocaleEnUS
  }
  appLocales = {
    zh_CN: AppLocaleZhCN,
    en_US: AppLocaleEnUS
  }
  // 初始化语言
  locale$ = new State<Locale>(Cookie.get('locale') || 'zh_CN')

  // antd文本map内容流
  antdLocaleMessages$ = this.locale$.pipe(
    map(locale => this.antdLocales[locale])
  )
  // app文本内容流
  appLocaleMessages$ = this.locale$.pipe(map(locale => this.appLocales[locale]))

  SET_LOCALE(locale: Locale) {
    this.locale$.commit(() => locale)
    Cookie.set('locale', locale)
  }
  translate(msgIndex: string): string {
    const appLocaleState = getState(this.appLocaleMessages$)
    const text = get(appLocaleState, msgIndex)
    if (!text) {
      console &&
        console.warn(
          `[localeService] can not translate [${msgIndex}],are you declared?`
        )
    }
    return text
  }
}

export const localeService = new LocaleService()
