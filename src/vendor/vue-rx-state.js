import { isObservable } from 'rxjs'
import { cloneDeep } from 'lodash-es'

const isObject = s => typeof s === 'object' && s !== null

export default {
  install(Vue) {
    Vue.mixin({
      beforeCreate() {
        const rxState = this.$options.rxState
        if (rxState) {
          this._rxObs = this._rxObs || {}
          if (typeof rxState !== 'function') {
            throw new Error(
              `[vue-rx-state] rxState should pass an function but got ${typeof rxState}`
            )
          }
          const obsConfig = rxState.call(this)
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
            this._rxObs[obName] = ob.subscribe(v => {
              try {
                if (obName in this) {
                  this.$set(this, obName, cloneDeep(v))
                  return
                }
                Vue.util.defineReactive(this, obName, cloneDeep(v))
              } catch (e) {
                throw new Error(`[vue-rx-state] uncaught error on [${obName}] ${e.message}`)
              }
            })
          }
        }
      },
      beforeDestroy() {
        const rxState = this.$options.rxState
        if (rxState) {
          for (let obName in this._rxObs) {
            this._rxObs[obName].unsubscribe && this._rxObs[obName].unsubscribe()
          }
        }
      }
    })
  }
}
