import { forEach } from 'lodash-es'
export default {
  /**
   *
   * @param {Vue} Vue
   */
  install(Vue) {
    Vue.mixin({
      beforeCreate() {
        const vmHost = this
        if (this.$options.hooks) {
          const hooks = this.$options.hooks.call(this)
          this.__hooks__ = hooks
          forEach(hooks, (hookOptions, hookName) => {
            this[hookName] = new Vue(
              Object.assign(hookOptions, {
                parent: vmHost
              })
            )
          })
        }
      },
      beforeDestroy() {
        if (this.__hooks__) {
          Object.keys(this.__hooks__).forEach(hookName => {
            this[hookName].$destroy()
          })
        }
      }
    })
  }
}
