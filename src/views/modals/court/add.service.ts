import { Injectable } from 'vue-service-app'
import { Effect } from 'rx-state'
import { Store } from '@/services/store'
import { CourtApi, SetInput } from '@/api/v1/shop/area'

@Injectable()
export class AddService extends Store<any> {
  constructor(protected courtApi: CourtApi) {
    super()
  }
  @Effect()
  add(params: SetInput) {
    return this.courtApi.add(params)
  }
}
