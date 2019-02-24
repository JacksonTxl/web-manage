import { Subject, Observable, BehaviorSubject } from 'rxjs'
import { refCount, publish } from 'rxjs/operators'

import { STATE_DEBUG } from '@/constants/config'

export type Mutation<T> = (state: T) => T
export type Epic = (observable: Observable<any>) => Observable<any>

export class State<T> extends BehaviorSubject<T> {
  mutations$: Subject<Mutation<T>>
  constructor(initialState: any, stateTag = 'untaged state') {
    super(initialState)
    this.mutations$ = new Subject()

    this.mutations$.forEach(mutation => {
      const prevState = this.value
      const newState = mutation(prevState)
      if (newState === prevState) {
        console.warn('same state with ->', this.value)
        return
      }
      if (STATE_DEBUG.test(stateTag)) {
        console.log(`state ${stateTag} mutated ->`, newState)
      }
      this.next(newState)
    })
  }
  /**
   * 执行一个同步函数以更新状态
   * @param mutation
   */
  commit(mutation: Mutation<T>) {
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

export function useState<T>(initialState: any, tag: string) {
  return new State<T>(initialState, tag)
}

export class Action<PAYLOAD> {
  trigger$!: Subject<PAYLOAD>
  action$: Observable<any>
  constructor(epic: Epic, actionTag = 'untaged Action') {
    this.trigger$ = new Subject()
    this.action$ = epic(this.trigger$).pipe(
      publish(),
      refCount()
    )
    this.action$.subscribe()
  }
  subscribe(...args: any[]) {
    return this.action$.subscribe(...args)
  }
  dispatch(payload: PAYLOAD) {
    this.trigger$.next(payload)
  }
}

export const useAction = (epic: Epic, tag: string) => {
  return new Action(epic, tag)
}
