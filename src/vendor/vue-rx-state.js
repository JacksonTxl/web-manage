import { isObservable } from 'rxjs'
import { cloneDeep } from 'lodash-es'

const isObject = s => typeof s === 'object' && s !== null

export default {
  install(Vue) {
    Vue.mixin({
      beforeCreate() {
        const rxStateOptions = this.$options.rxState
        if (rxStateOptions) {
          if (typeof rxStateOptions !== 'function') {
            throw new Error(
              `[vue-rx-state] rxState should pass an function but got ${typeof rxStateOptions}`
            )
          }
          const obsConfig = rxStateOptions.call(this)
          if (!isObject(obsConfig)) {
            throw new Error(
              `[vue-rx-state] rxState function should return an object but got ${typeof obsConfig}`
            )
          }
          for (let obName in obsConfig) {
            const ob = obsConfig[obName]
            if (!isObservable(ob)) {
              throw new Error(
                `[vue-rx-state] rxState [${obName}] should be an Observable but got ${typeof ob}`
              )
            }
            ob.subscribe(v => {
              if (obName in this) {
                this.$set(this, obName, cloneDeep(v))
                return
              }
              Vue.util.defineReactive(this, obName, cloneDeep(v))
            })
          }
        }
      }
    })
  }
}
