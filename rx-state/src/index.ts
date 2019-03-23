import { Subject, Observable, BehaviorSubject, of } from 'rxjs'
import { refCount, publish } from 'rxjs/operators'

interface SetupOptions {
  debug: boolean
  onStateChange(value: any, tag: string, timestamp: number): void
}

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
    let newState
    if (mutation.length < 1) {
      newState = mutation(this.value)
    } else {
      const clonedState = JSON.parse(JSON.stringify(this.value))

      const returned = mutation(clonedState)
      if (returned === undefined) {
        newState = clonedState
      } else {
        newState = returned
      }
    }

    if (newState !== this.value) {
      if (process.env.NODE_ENV === 'development') {
        console.log(this.tag, 'mutated', newState)
      }
      this.next(newState)
    }
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

export class Action<PAYLOAD> {
  trigger$: Subject<PAYLOAD>
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
  dispatch(payload?: PAYLOAD) {
    this.trigger$.next(payload)
  }
}

export const useAction = (epic: Epic, tag: string) => {
  return new Action(epic, tag)
}

export const complete = (value?: any) => {
  return of(value || 'COMPLETE')
}
