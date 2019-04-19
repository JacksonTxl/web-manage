import { Store } from '@/services/store'
import { State, Computed } from 'rx-state/src'
import { pluck, distinctUntilChanged } from 'rxjs/operators'

export class RxService extends Store<any> {
  state$: State<{
    list: any[]
    info: {
      a: number
      b: number
    }
  }>
  list$: Computed<any[]>
  info$: Computed<any>
  constructor() {
    super()
    this.state$ = new State({
      list: [0],
      info: {
        a: 1,
        b: 2
      }
    })
    this.list$ = new Computed(this.state$.pipe(pluck('list')))
    this.info$ = new Computed(this.state$.pipe(pluck('info')))
  }
  SET_LIST() {
    this.state$.commit(state => {
      state.list[0] = 1
      state.info.a = 3
      state.info.b = 4
    })
  }
}
