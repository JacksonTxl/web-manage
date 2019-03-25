import { State } from 'rx-state'

export class Store<T> {
  /**
   * 状态流 一般声明初始的状态，计算的状态不需要在这里，使用Computed即可
   */
  state$: State<T>
  /**
   * 加载的状态流 用于方便的获取请求的加载状态
   */
  loading$: State<{}>
  constructor() {
    this.state$ = new State({})
    this.loading$ = new State({})
  }
}
