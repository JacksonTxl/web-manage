import { Injectable } from 'vue-service-app'
import { ShopStaffApi, BindbankParams } from '@/api/v1/staff/staff'

@Injectable()
export class BindService {
  constructor(private api: ShopStaffApi) {
  }

  bind(id: string) {
    return this.api.bindcard(id)
  }
  bindbank(id: string, params: BindbankParams) {
    return this.api.bindbank(id, params)
  }
}
