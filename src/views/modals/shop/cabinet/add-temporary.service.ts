import { Injectable } from 'vue-service-app'
import { Store } from '@/services/store'
import { TemporaryCabinetApi, AddInput } from '@/api/v1/setting/cabinet/temporary'
import { Effect } from 'rx-state/src'

@Injectable()
export class AddTemporaryService extends Store<any> {
  constructor(private cabinetApi: TemporaryCabinetApi) {
    super()
  }
  @Effect()
  add(params: AddInput) {
    return this.cabinetApi.add(params)
  }
}
