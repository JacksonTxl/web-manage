import { forEach, isPlainObject } from 'lodash-es'

class EventBus {
  constructor() {
    this.ls = {}
  }
  on(name, fn) {
    if (!this.ls[name]) {
      this.ls[name] = []
    }
    this.ls[name].push(fn)
  }
  off(name, fn) {
    this.ls[name] = this.ls[name].filter(l => l !== fn)
  }
  emit(name, ...args) {
    if (this.ls[name]) {
      this.ls[name].forEach(l => l(...args))
    }
  }
}
export default {
  install(Vue) {
    const events = new EventBus()
    Vue.prototype.$events = events
    Vue.mixin({
      beforeCreate() {
        if (this.$options.events) {
          if (!isPlainObject(this.$options.events)) {
            throw new Error('options [events] need be an object')
          }
          forEach(this.$options.events, (fn, name) => {
            this[name] = fn.bind(this)
            events.on(name, this[name])
          })
        }
      },
      beforeDestroy() {
        if (this.$options.events) {
          forEach(this.$options.events, (_, name) => {
            events.off(name, this[name])
          })
        }
      }
    })
  }
}
