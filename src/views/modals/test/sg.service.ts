import { State } from 'rx-state'
import { Multiton } from 'vue-service-app'

@Multiton()
export class SgService {
  a$ = new State(1)

  constructor() {
    setTimeout(() => {
      this.a$.commit(() => 9)
    }, 1000)
  }
}
