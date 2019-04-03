import { Injectable } from 'vue-service-app'
import { Store } from '@/services/store'
import { SwitchApi, SwitchIndexInput } from '@/api/account/switch'

interface SwitchState {
}
@Injectable()
export class SwitchService extends Store<SwitchState> {
  constructor(private switchApi: SwitchApi) {
    super()
  }
  getBrands(data: SwitchIndexInput = {}) {
    return this.switchApi.switchIndex(data)
  }
}
