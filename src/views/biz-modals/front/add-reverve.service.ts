import { ReserveApi, AddReverveInput } from '@/api/v1/front/reserve'
import { State, Effect } from 'rx-state'
import { Injectable } from 'vue-service-app'

@Injectable()
export class AddReverveService {
  loading$ = new State({})
  constructor(private reverveApi: ReserveApi) {}
  @Effect()
  addReverse(params: AddReverveInput) {
    return this.reverveApi.addReverse(params)
  }
}
