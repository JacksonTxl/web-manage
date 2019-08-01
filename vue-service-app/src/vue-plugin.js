import ServiceRouter from './router'
import { isFn, isObject } from './utils'

export default {
  install(Vue, rootContainer) {
    Vue.use(ServiceRouter)
    Vue.mixin({
      beforeCreate() {
        const { serviceInject, serviceProviders } = this.$options

        if (serviceProviders) {
          if (!isFn(serviceProviders)) {
            throw new Error(
              `[vue-service-app] serviceProviders should be function but got ${typeof serviceProviders}`
            )
          }
          const providers = serviceProviders.call(this)
          if (!Array.isArray(providers)) {
            throw new Error(
              `[vue-service-app] serviceProviders should be function return an array but got ${typeof providers}`
            )
          }

          providers.forEach(p => {
            if (p === undefined) {
              throw new Error(
                `[vue-service-app] serviceProviders you just provide undefined`
              )
            }
          })
          this._componentSerivceProviders = providers
        }
        if (serviceInject) {
          if (!isFn(serviceInject)) {
            throw new Error(
              `[vue-service-app] serviceInject should be function but got ${typeof serviceInject}`
            )
          }
          const injects = serviceInject.call(this)
          if (!isObject(injects)) {
            throw new Error(
              `[vue-service-app] serviceInject should be function return an object but got ${typeof injects}`
            )
          }
          for (let name in injects) {
            if (injects[name] === undefined) {
              throw new Error(
                `[vue-service-app] serviceInject you just inject undefined in [${name}]`
              )
            }

            this[name] = rootContainer.get(injects[name])
          }
        }
      },
      // 组件销毁时 销毁根容器的provider实例
      beforeDestroy() {
        const { serviceProviders } = this.$options
        if (serviceProviders) {
          // todo 销毁 services
          this._componentSerivceProviders.forEach(p => {
            rootContainer.destroy(p)
          })
        }
      }
    })
  }
}
