import { Subject, Observable } from 'rxjs'
import {
  scan,
  startWith,
  distinctUntilChanged,
  publishReplay,
  refCount,
  shareReplay
} from 'rxjs/operators'
import { STATE_DEBUG } from '@/constants/config'

type Mutation = (state?: any) => any
type Action = (observable: Observable<any>) => Observable<any>

interface ObservableState<T> extends Observable<T> {
  commit(mutation: Mutation): any
}

export function useState<T>(initialState: T, tag = 'unknown state') {
  const commitState$ = new Subject<Mutation>()

  // state 只能由mutation改变
  const state$: ObservableState<T> = commitState$
    .pipe(startWith(initialState))
    // @ts-ignore
    .pipe(scan((prevState: T, mutation: T) => mutation(prevState)))
    .pipe(distinctUntilChanged())
    .pipe(shareReplay(1))

  if (STATE_DEBUG.test(tag)) {
    state$.forEach(state => {
      console.log(`${tag} state is ->`, state)
    })
  }

  const commitState = (mutation: Mutation) => {
    commitState$.next(mutation)
  }

  state$.commit = commitState
  return state$
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
