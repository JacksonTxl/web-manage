import { Injectable } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { pluck } from 'rxjs/operators'
import { Store } from '@/services/store'

interface TlState {
  name: string
  age: number
}
@Injectable()
export class TlService extends Store<TlState> {
  state$: State<TlState>
  name$: Computed<string>
  constructor() {
    super()
    this.state$ = new State({
      name: 't'
    })
    this.name$ = new Computed(this.state$.pipe(pluck('name')))
  }
}
