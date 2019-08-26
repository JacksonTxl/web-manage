export default class HistoryBF {
  constructor() {
    this.isHistoryBF = false
    this._init()
  }
  /**
   * 监听浏览器原生popstate 代表正在使用前进后退
   * 该事件会在router.beforeEach钩子前触发
   */
  _init() {
    window.addEventListener('popstate', () => {
      this.isHistoryBF = true
    })
  }
}
