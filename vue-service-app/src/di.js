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
    if (Cls.__injectedTypes) {
      this.getValue = () => {
        if (!this.instance) {
          const injects = Cls.__injectedTypes.map(token =>
            this.containerInstance.get(token)
          )
          this.instance = new Cls(...injects)
        }
        return this.instance
      }
    } else {
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
  bind(provide) {
    const provider = new Provider(provide, this)
    this._providers.set(provide, provider)
    return provider
  }
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
  get(provide) {
    const provider = this._providers.get(provide)
    if (!provider) {
      if (typeof provide === 'function') {
        // 默认注入
        this.useProvider({ provide: provide, useClass: provide })
        return this._providers.get(provide).getValue()
      } else {
        console && console.error('[vue-service-app] Invalid provide->', provide)
      }
    } else {
      return provider.getValue()
    }
  }
}

export function Inject(token) {
  if (!token) {
    console && console.error('[vue-service-app] Inject() params got ->', token)
  }
  return function(target, propKey, propIndex) {
    if (!target.__injectedTypes) {
      target.__injectedTypes = []
    }
    target.__injectedTypes[propIndex] = token
  }
}
export function Injectable() {
  return function(target) {
    const outerInjected = Reflect.getMetadata('design:paramtypes', target)
    const innerInjected = target.__injectedTypes
    if (!innerInjected) {
      target.__injectedTypes = outerInjected
    } else {
      outerInjected.forEach((outer, index) => {
        if (!innerInjected[index]) {
          target.__injectedTypes[index] = outer
        }
      })
    }
    return target
  }
}
