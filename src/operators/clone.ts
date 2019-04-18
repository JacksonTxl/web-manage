import { Observable } from 'rxjs'
import { cloneDeep } from 'lodash-es'
import { map } from 'rxjs/operators'

export function clone() {
  return function(source$: Observable<any>) {
    return source$.pipe(map(state => cloneDeep(state)))
  }
}
