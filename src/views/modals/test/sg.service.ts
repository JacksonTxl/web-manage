import { State } from 'rx-state'

export class SgService {
  a$ = new State(1)

  constructor() {
    setTimeout(() => {
      this.a$.commit(() => 9)
    }, 1000)
  }
}
