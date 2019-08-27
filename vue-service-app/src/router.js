import VueRouter from 'vue-router'
import { isString } from './utils'

/**
 * 扩展VueRouter
 * * 新增 {force} 选项
 * * 新增 reload() 刷新路由 参数不变
 */
export default class ServiceRouter extends VueRouter {
  constructor(routeOptions, historyBF) {
    super(routeOptions)
    this._forceCount = 1
    this._histroyBF = historyBF
  }
  /**
   * 手工的跳转
   * @param {string} mode replace | push
   * @param {string | object} location VueRouter 的location
   * @param {Function} onComplete 成功回调
   * @param {Function} onError 失败回调
   */
  get isHistoryBF() {
    return this._histroyBF.isHistoryBF
  }
  _goto(mode, location, onComplete, onError) {
    this._histroyBF.isHistoryBF = false
    if (isString(location)) {
      super[mode](location, onComplete, onError)
      return
    }
    if (!location.force) {
      super[mode](location, onComplete, onError)
      return
    }
    const oriHref = this.resolve(location).href
    location.query = location.query || {}
    location.query._f = this._forceCount++
    super[mode](
      location,
      () => {
        setTimeout(() => {
          window.history.replaceState(null, null, oriHref)
          onComplete && onComplete()
        })
      },
      onError
    )
  }
  push(location, onComplete, onError) {
    this._goto('push', location, onComplete, onError)
  }
  replace(location, onComplete, onError) {
    console.log('replace')
    this._goto('replace', location, onComplete, onError)
  }
  /**
   * spa reload current Route and force get Data again
   */
  reload(onComplete, onError) {
    this.replace(
      { path: location.href.replace(location.origin, ''), force: true },
      onComplete,
      onError
    )
  }
}
