import { State, Computed, computed } from 'rx-state'
import { Injectable } from 'vue-service-app'
import VueI18n from 'vue-i18n'
import Cookie from 'js-cookie'
// @ts-ignore
import zh_CN_Antd from 'ant-design-vue/lib/locale-provider/zh_CN'
// @ts-ignore
import en_US_Antd from 'ant-design-vue/lib/locale-provider/en_US'

// type reference https://vue.ant.design/docs/vue/i18n/
type Locale = 'zh_CN' | 'en_US'

// TODO: i18nService 与 httpService 相互依赖 i18n->api->http->i18n
@Injectable()
export class I18NService {
  firstInit = false
  locale$ = new State<Locale>(Cookie.get('language') || 'zh_CN')
  antdLocaleMessages$ = computed(
    (locale: string) => {
      if (locale === 'zh_CN') {
        return zh_CN_Antd
      }
      if (locale === 'en_US') {
        return en_US_Antd
      }
    },
    [this.locale$]
  )
  constructor(private vueI18n: VueI18n) {}
  setLocale(locale: Locale) {
    this.locale$.commit(() => locale)
    this.vueI18n.locale = locale
  }
  t(key: string, ...args: any[]) {
    return this.vueI18n.t(key, ...args) as string
  }
}
