import { Subject, Observable, BehaviorSubject } from 'rxjs'
import {
  publishReplay,
  refCount
} from 'rxjs/operators'

type Mutation = (state?: any) => any

export class StateSubject<T> extends BehaviorSubject<T> {
  mutations$: Subject<Mutation>
  constructor(initialState: any) {
    super(initialState)
    this.mutations$ = new Subject()

    this.mutations$.forEach(mutation => {
      const prevState = this.value
      const newState = mutation(prevState)
      if (newState === prevState) {
        console.warn('same state with ->', this.value)
        return
      }
      this.next(newState)
    })
  }
  /**
   * 执行一个同步函数以更新状态
   * @param mutation
   */
  commit(mutation: Mutation) {
    if (!mutation || typeof mutation !== 'function') {
      console.warn('commit need an mutation function')
      return
    }
    this.mutations$.next(mutation)
  }
  /**
   * @description
   * 返回当前流式状态的最新值快照
   */
  get snapshot() {
    return this.getValue()
  }
}

type Action = (observable: Observable<any>) => Observable<any>

export function useState<T>(initialState: any, name = '') {
  return new StateSubject<T>(initialState)
}

export const useAction = (pipeFn: Action, tag = 'unknown action') => {
  const trigger$ = new Subject()
  const piped$ = pipeFn(trigger$).pipe(
    publishReplay(),
    refCount()
  )

  piped$.subscribe()

  const dispatchAction = (payload?: any) => {
    trigger$.next(payload)
  }

  return dispatchAction
}
