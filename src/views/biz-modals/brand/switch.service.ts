import { Injectable } from 'vue-service-app'
import { Store } from '@/services/store'
import { SwitchApi, SwitchIndexInput } from '@/api/v1/account/switch'

@Injectable()
export class SwitchService {
  constructor(private switchApi: SwitchApi) {}
  getBrands(data: SwitchIndexInput = {}) {
    return this.switchApi.switchIndex(data)
  }
}
