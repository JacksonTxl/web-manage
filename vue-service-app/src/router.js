import VueRouter from 'vue-router'
import { isString } from './utils'
/**
 * 扩展VueRouter
 * * 新增 {force} 选项
 * * 新增 reload() 刷新路由 参数不变
 */
export default class ServiceRouter extends VueRouter {
  constructor(...args) {
    super(...args)
    this._forceCount = 0
  }
  _goto(mode, to, onComplete, onError) {
    if (isString(to)) {
      super[mode](to, onComplete, onError)
      return
    }
    if (!to.force) {
      super[mode](to, onComplete, onError)
      return
    }
    const oriHref = this.resolve(to).href
    to.query = to.query || {}
    to.query._f = this._forceCount++
    super[mode](
      to,
      () => {
        setTimeout(() => {
          window.history.replaceState(null, null, oriHref)
          onComplete && onComplete()
        })
      },
      onError
    )
  }
  push(to, onComplete, onError) {
    this._goto('push', to, onComplete, onError)
  }
  replace(to, onComplete, onError) {
    this._goto('replace', to, onComplete, onError)
  }
  reload(onComplete, onError) {
    this.replace(
      { path: location.href.replace(location.origin, ''), force: true },
      onComplete,
      onError
    )
  }
}
