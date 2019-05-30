import { Injectable } from 'vue-service-app'
import { ShopStaffApi } from '@/api/v1/staff/staff'

@Injectable()
export class LeaveStoreService {
  constructor(private api: ShopStaffApi) {
  }
  getInfo(id: string) {
    return this.api.getLeaveStoreInfo(id)
  }
  leaveStore(id: string) {
    return this.api.leaveStore(id)
  }
}
