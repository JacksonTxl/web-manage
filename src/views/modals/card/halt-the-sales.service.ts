import { Injectable } from 'vue-service-app'
import { State } from 'rx-state/src'

@Injectable()
export class HaltTheSalesService {
  loading$ = new State({})
}
