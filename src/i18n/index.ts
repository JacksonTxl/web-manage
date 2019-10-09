import Vue from 'vue'
import VueI18n from 'vue-i18n'
import container from '@/container'
// @ts-ignore
import zh_CN from './zh_CN'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zh_CN',
  fallbackLocale: 'zh_CN',
  messages: {
    zh_CN
  }
})

container.bindValue(VueI18n, i18n)

export default i18n
