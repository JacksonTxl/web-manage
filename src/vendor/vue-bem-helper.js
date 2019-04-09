import { BEMBlock } from 'bem-helpers'

export default {
  install(Vue) {
    Vue.mixin({
      beforeCreate() {
        const bemOptions = this.$options.bem
        if (bemOptions) {
          if (typeof bemOptions === 'object' && bemOptions !== null) {
            Object.keys(bemOptions).forEach(name => {
              Vue.util.defineReactive(this, name, BEMBlock(bemOptions[name]))
            })
          }
        }
      }
    })
  }
}
