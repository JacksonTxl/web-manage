import Vue from 'vue'
import Antd from 'ant-design-vue'
import VueRx from 'vue-rx'
import router from './router/index'
import { modalRouter } from './modal-router/index'
import App from './App.vue'
import { setup } from 'rx-state'
import { IS_DEV } from './constants/config'
import { debugService } from './services/debug.service'
import { localeService } from './services/locale.service'

import './style/app.less'

Vue.use(Antd)
Vue.use(VueRx)

setup({
  debug: IS_DEV,
  onStateChange: (stateSnapshot, tag) => {
    debugService.stateEvent$.dispatch({
      tag,
      stateSnapshot
    })
  }
})

Vue.mixin({
  methods: {
    $t(...args) {
      // @ts-ignore
      return this.$root.localeTranslateVue(...args)
    }
  }
})

const app = new Vue({
  el: '#app',
  subscriptions() {
    return {
      appLocaleMessages: localeService.appLocaleMessages$
    }
  },
  methods: {
    localeTranslateVue(key: string): string {
      // @ts-ignore
      return localeService.translateGet(this.appLocaleMessages, key)
    }
  },
  router,
  // @ts-ignore
  modalRouter,
  render: h => h(App)
})
