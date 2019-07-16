import { Injectable } from 'vue-service-app'
import { Store } from '@/services/store'
import { Effect } from 'rx-state/src'
import {
  CabinetPriceApi,
  UpdateInput
} from '@/api/v1/setting/cabinet/price'

@Injectable()
export class EditPriceService extends Store<any> {
  constructor(private cabinetPriceApi: CabinetPriceApi) {
    super()
  }
  @Effect()
  updatePrice(params: UpdateInput) {
    return this.cabinetPriceApi.update(params)
  }
}
