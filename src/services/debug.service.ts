import { Action } from 'rx-state/src'
import { tap, bufferTime, filter } from 'rxjs/operators'

export class DebugService {
  stateEvent$: Action<any>
  constructor() {
    this.stateEvent$ = new Action(data$ =>
      data$.pipe(
        bufferTime(200),
        filter((states: any[]) => !!states.length),
        tap(states => {
          console.table(states)
        })
      )
    )
  }
}

export const debugService = new DebugService()
