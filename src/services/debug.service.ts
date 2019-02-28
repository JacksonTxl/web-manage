import { Observable } from 'rxjs'
import { Action } from 'rx-state/src'
import { bufferTime, tap, filter } from 'rxjs/operators'

class DebugService {
  stateEvent$: Action<any>
  constructor() {
    this.stateEvent$ = new Action(data$ =>
      data$
        .pipe(bufferTime(200))
        .pipe(filter(res => !!res.length))
        .pipe(
          tap(mutatedStates => {
            console.table(mutatedStates)
          })
        )
    )
  }
}

export const debugService = new DebugService()
