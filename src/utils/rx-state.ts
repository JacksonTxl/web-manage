import { Subject, Observable, BehaviorSubject } from 'rxjs'
import { refCount, publish } from 'rxjs/operators'

import { STATE_DEBUG } from '@/constants/config'

export type Mutation<T> = (state: T) => T | void
export type Epic = (stream: Observable<any>) => Observable<any>

let stateIndex = 1
export class State<T> extends BehaviorSubject<T> {
  tag: string
  constructor(initialState: any, tag?: string) {
    super(initialState)
    this.tag = tag || `@@${stateIndex++}`
  }
  commit(mutation: Mutation<T>) {
    const prevState = JSON.parse(JSON.stringify(this.value))
    let newState
    const returned = mutation(prevState)
    if (returned === undefined) {
      newState = prevState
    } else {
      newState = returned
    }

    if (STATE_DEBUG.test(this.tag)) {
      console.log(`[${this.tag}] mutated ->`, newState)
    }
    this.next(newState)
  }
}

export function $<T>(initialState: any, tag?: string) {
  return new State<T>(initialState, tag)
}
/**
 * 获得一个流最后的值状态
 */
export function getState<T>(stream: Observable<T>): T {
  let currentState: any = null
  const subscribtion = stream.subscribe(v => {
    currentState = v
  })
  subscribtion.unsubscribe()
  return currentState
}

export function withNamespace(namespace: string) {
  return function(tag: string) {
    return namespace + '/' + tag
  }
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
