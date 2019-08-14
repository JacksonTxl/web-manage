import { isCtor } from './utils'
const INJECTED = '__injectedTypes'

export class Container {
  providers = new Map()
  bindValue(token, value) {
    this.providers.set(token, value)
  }
  get(token) {
    const instance = this.providers.get(token)
    if (instance) {
      return instance
    } else {
      // 自动实例化
      if (isCtor(token)) {
        const newInstance = this.getInstanceFromClass(token)
        this.providers.set(token, newInstance)
        return newInstance
      } else {
        console.error('[vue-service-app] Invalid provide->', token)
      }
    }
  }
  destroy(token) {
    const instance = this.providers.get(token)
    if (instance) {
      this.providers.delete(token)
    }
  }
  getInstanceFromClass(Cls) {
    if (Cls[INJECTED]) {
      const injects = Cls[INJECTED].map(childToken => this.get(childToken))
      return new Cls(...injects)
    } else {
      if (Cls.length) {
        throw new Error(
          `[vue-service-app] detect [${
            Cls.name
          }] has dependancy services but,but no @Injectable() or @Inject() decorate it`
        )
      }
      return new Cls()
    }
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
