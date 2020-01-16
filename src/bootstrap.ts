import './hot-release'
import './sentry-reporter'
import '@abraham/reflection'
import Vue from 'vue'
import Antd from 'ant-design-vue'

import { modalRouter } from './modal-router/index'
// @ts-ignore
import VueBemHelper from '@/vendor/vue-bem-helper'
// @ts-ignore
import VueRxState from '@/vendor/vue-rx-state'
// @ts-ignore
import VueStyleguide from '@/vendor/vue-styleguide'

import VueStForm from 'vue-st-form'

import ICountUp from 'vue-countup-v2'
// @ts-ignore
import Viewer from 'v-viewer'
import VueServiceApp from 'vue-service-app'
import PortalVue from 'portal-vue'

import container from './container'
import i18n from '@/i18n'

// 默认样式加载
import './views/components/register'
import './filters/register'
import './directives/register'

// @ts-ignore
import Scrollbar from '@/vendor/vue-scrollbar'
// @ts-ignore
import VueComponentHooks from '@/vendor/vue-component-hooks'
import { UserService } from './services/user.service'
import { MessageService } from './services/message.service'
import { NotificationService } from './services/notification.service'

Vue.use(VueServiceApp, container)
Vue.use(Scrollbar)
Vue.use(VueRxState)
Vue.use(Antd)
// https://www.npmjs.com/package/v-viewer
Vue.use(Viewer)
Vue.use(VueBemHelper)
// https://portal-vue.linusb.org/
Vue.use(PortalVue)
// @ts-ignore
Vue.use(VueStForm)
Vue.use(VueStyleguide)
Vue.use(VueComponentHooks)

Vue.component(ICountUp.name, ICountUp)

interface BootstrapConfig {
  AppComponent: any
  routes: any[]
}

export default function bootstrap(bootstrapConfig: BootstrapConfig) {
  const routes = bootstrapConfig.routes.concat([
    {
      path: '*',
      beforeEnter() {
        location.href = '/404'
      }
    }
  ])
  const { router } = new VueServiceApp({
    container,
    routes,
    scrollBehavior: (to: any, from: any) => {
      if (to.name === from.name) {
        return
      }
      return {
        y: 0
      }
    }
  })
  Vue.prototype.$c = (...args: any[]) => {
    return container.get(UserService).c(...args)
  }
  Vue.prototype.$message = container.get(MessageService)
  Vue.prototype.$notification = container.get(NotificationService)

  new Vue({
    el: '#app',
    router,
    i18n,
    // @ts-ignore
    modalRouter,
    render: h => h(bootstrapConfig.AppComponent)
  })
}
