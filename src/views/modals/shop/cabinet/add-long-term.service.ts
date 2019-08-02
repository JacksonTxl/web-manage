import { Injectable } from 'vue-service-app'
import { Store } from '@/services/store'
import {
  LongTermCabinetApi,
  AddInput
} from '@/api/v1/setting/cabinet/long-term'
import { Effect } from 'rx-state'

@Injectable()
export class AddLongTermService extends Store<any> {
  constructor(private cabinetApi: LongTermCabinetApi) {
    super()
  }
  @Effect()
  add(params: AddInput) {
    return this.cabinetApi.add(params)
  }
}
