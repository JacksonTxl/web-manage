import { Observable, of, EMPTY } from 'rxjs'
import { switchMap, catchError } from 'rxjs/operators'

export const then = (fn: any) => (source$: Observable<any>) => {
  const target$ = source$.pipe(
    switchMap(prevRes => {
      const ret = fn(prevRes)
      if (ret instanceof Observable) {
        return ret
      } else {
        return of(ret)
      }
    })
  )
  return target$
}

export default then
