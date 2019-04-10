import { Subject, Observable, BehaviorSubject } from 'rxjs'
import produce from 'immer'

import { refCount, publish, tap, finalize, shareReplay } from 'rxjs/operators'

export type Mutation<T> = (state: T) => T | void
export type Epic<T> = (source$: Observable<T>) => Observable<any>

export class State<T> extends BehaviorSubject<T> {
  constructor(initialState: any) {
    super(initialState)
  }
  commit(mutation: Mutation<T>): void {
    this.next(
      // @ts-ignore
      produce(this.value, mutation)
    )
  }
}

/**
 * 获得一个流最后的值状态快照
 */
export function getSnapshot<T>(stream: Observable<T>): T {
  let currentState: any = null
  const subscribtion = stream.subscribe(v => {
    currentState = v
  })
  subscribtion.unsubscribe()
  return currentState
}

export class Action<Payload> {
  trigger$: Subject<Payload>
  action$: Observable<any>
  constructor(epic: Epic<Payload>) {
    this.trigger$ = new Subject()
    this.action$ = epic(this.trigger$).pipe(
      publish(),
      refCount()
    )
    this.action$.subscribe()
  }
  dispatch(payload?: Payload) {
    this.trigger$.next(payload)
  }
  subscribe(...args: any[]) {
    this.action$.subscribe(...args)
  }
}

export function log(tag?: string) {
  return function(source$: Observable<any>) {
    return source$.pipe(
      tap((v: any) => {
        if (tag) {
          console.log(`[rx-state] state [${tag}] -> `, v)
        } else {
          console.log(`[rx-state] state ->`, v)
        }
      })
    )
  }
}

const PATCH = (tag: string, value: any) => (state: any) => {
  state[tag] = value
}

export function Effect() {
  return function(target: any, propKey: string, descriptor: any) {
    const originalFn = target[propKey]
    descriptor.value = function() {
      if (!this.loading$) {
        console &&
          console.warn(
            '[rx-state]  Effect decorator can not find  loading$ stream!'
          )
        return originalFn.apply(this, arguments)
      }
      this.loading$.commit(PATCH(propKey, true))
      const oriRequest$: Observable<any> = originalFn.apply(this, arguments)
      const request$ = oriRequest$.pipe(
        tap(() => {
          this.loading$.commit(PATCH(propKey, false))
        }),
        finalize(() => {
          this.loading$.commit(PATCH(propKey, false))
        })
      )
      return request$
    }
  }
}

export class Computed<T> extends Observable<T> {
  constructor(source$: Observable<T>) {
    super()
    return source$.pipe(shareReplay(1))
  }
}
