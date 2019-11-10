import { isFunction, forEach } from 'lodash-es'
import { plusHook } from 'vue-router-plus'

const createController = (Ctrl, container) => {
  const ctrl = container.get(Ctrl)
  const routeHookMaps = {
    beforeEach: ['beforeRouteEnter', 'beforeRouteUpdate'],
    beforeRouteEnter: ['beforeRouteEnter'],
    beforeRouteUpdate: ['beforeRouteUpdate'],
    beforeRouteLeave: ['beforeRouteLeave']
  }
  const vmHooks = ['beforeCreate']
  const mixin = {
    beforeRouteEnter: [],
    beforeRouteUpdate: [],
    beforeRouteLeave: [],
    beforeCreate: []
  }

  forEach(routeHookMaps, (vmHooks, ctrlHook) => {
    if (isFunction(ctrl[ctrlHook])) {
      vmHooks.forEach(vmHook => {
        mixin[vmHook].push(plusHook(ctrl[ctrlHook].bind(ctrl)))
      })
    }
  })
  forEach(vmHooks, vmHook => {
    if (isFunction(ctrl[vmHook])) {
      mixin[vmHook].push(ctrl[vmHook].bind(ctrl))
    }
  })
  return mixin
}

export default createController
