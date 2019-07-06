import { isFn } from './utils'
const INJECTED = '__injectedTypes'

class Provider {
  constructor(token, containerInstance) {
    this.token = token
    this.containerInstance = containerInstance
    this.instance = null
  }
  toSelf() {
    const Cls = this.token
    this.toClass(Cls)
  }
  toClass(Cls) {
    if (Cls[INJECTED]) {
      this.getValue = () => {
        if (!this.instance) {
          const injects = Cls[INJECTED].map(token =>
            this.containerInstance.get(token)
          )
          this.instance = new Cls(...injects)
        }
        return this.instance
      }
    } else {
      if (Cls.length) {
        throw new Error(
          `[vue-service-app] detect [${
            Cls.name
          }] has depency services but,but no @Injectable() or @Inject() decorate it`
        )
      }
      this.getValue = () => {
        if (!this.instance) {
          this.instance = new Cls()
        }
        return this.instance
      }
    }
  }
  toValue(value) {
    this.getValue = () => value
  }
}
export class InjectionToken {
  constructor(name) {
    this.name = name
  }
}
export class Container {
  _providers = new Map()
  /**
   * @type {Container} 父容器
   */
  parent = null
  bind(provide) {
    const provider = new Provider(provide, this)
    this._providers.set(provide, provider)
    return provider
  }
  /**
   *
   * @param {object} provider 供应商对象
   * @param {provider.provide} 供应
   * @param {provider.useClass} 使用类注入
   * @param {provider.useValue} 使用值注入
   */
  useProvider({ provide, useClass, useValue } = {}) {
    if (useClass) {
      this.bind(provide).toClass(useClass)
      return this
    }
    if (useValue) {
      this.bind(provide).toValue(useValue)
      return this
    }
  }
  get(token) {
    // 从实例化的供应商map中取
    const provider = this._providers.get(token)
    if (!provider) {
      // 是构造函数并且没有父容器的时候 使用lazy模式实例化该类
      if (isFn(token)) {
        // 默认注入
        this.useProvider({ provide: token, useClass: token })
        return this._providers.get(token).getValue()
      } else {
        console && console.error('[vue-service-app] Invalid provide->', token)
      }
    } else {
      return provider.getValue()
    }
  }
  new(token) {
    if (isFn(token)) {
      const provider = new Provider(token, this)
      provider.toClass(token)
      return provider.getValue()
    } else {
      console && console.error('[vue-service-app] Invalid provide->', token)
    }
  }
  /**
   * 删除已实例化的供应商
   */
  destroy(provide) {
    this._providers.delete(provide)
    return this
  }
}

export function Inject(token) {
  if (!token) {
    console && console.error('[vue-service-app] Inject() params got ->', token)
  }
  return function(target, propKey, propIndex) {
    if (!target[INJECTED]) {
      target[INJECTED] = []
    }
    target[INJECTED][propIndex] = token
  }
}
export function Injectable() {
  return function(target) {
    const outerInjected = Reflect.getMetadata('design:paramtypes', target)
    const innerInjected = target[INJECTED]
    if (!innerInjected) {
      target[INJECTED] = outerInjected
    } else {
      outerInjected.forEach((outer, index) => {
        if (!innerInjected[index]) {
          target[INJECTED][index] = outer
        }
      })
    }
    return target
  }
}
