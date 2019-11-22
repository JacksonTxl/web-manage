import { isFunction, forEach } from 'lodash-es'
import { plusHook } from 'vue-router-plus'
import Multiguard from 'vue-router-multiguard'

const createController = (Ctrl, container) => {
  let ctrl
  const mixin = {
    beforeRouteEnter: [
      function(to, from, next) {
        ctrl = container.get(Ctrl)
        next()
      },
      function(to, from, next) {
        if (!ctrl) {
          next()
        }
        const beforeHooks = []
        if (isFunction(ctrl.beforeEach)) {
          beforeHooks.push(plusHook(ctrl.beforeEach.bind(ctrl)))
        }
        if (isFunction(ctrl.beforeRouteEnter)) {
          beforeHooks.push(plusHook(ctrl.beforeRouteEnter.bind(ctrl)))
        }
        return Multiguard(beforeHooks)(to, from, next)
      }
    ],
    beforeRouteUpdate: [
      function(to, from, next) {
        if (!ctrl) {
          next()
        }
        const updateHooks = []
        if (isFunction(ctrl.beforeEach)) {
          updateHooks.push(plusHook(ctrl.beforeEach.bind(ctrl)))
        }
        if (isFunction(ctrl.beforeRouteUpdate)) {
          updateHooks.push(plusHook(ctrl.beforeRouteUpdate.bind(ctrl)))
        }
        return Multiguard(updateHooks)(to, from, next)
      }
    ],
    beforeRouteLeave: [],
    beforeCreate: [
      function() {
        if (!ctrl) {
          return
        }
        if (isFunction(ctrl.beforeCreate)) {
          const ret = ctrl.beforeCreate.call(ctrl)
          if (ret && ret.subscribe) {
            ret.subscribe()
          }
          return ret
        }
      }
    ],
    beforeDestroy: [
      function() {
        container.destroy(Ctrl)
        ctrl = null
      }
    ]
  }
  return mixin
}

export default createController
