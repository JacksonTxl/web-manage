import { State } from 'rx-state'
import Cookie from 'js-cookie'

type Locale = 'zh_CN' | 'en_US'
class LocaleService {
  // 初始化语言
  locale = new State<Locale>('zh_CN' || Cookie.get('locale'))
  constructor() {
    this.locale.subscribe(locale => {
      import(`@/i18n/${locale}`).then(res => {
        console.log(res)
      })
    })
  }
  SET_LOCALE(locale: Locale) {
    this.locale.commit(() => locale)
  }
}

export const localeService = new LocaleService()
