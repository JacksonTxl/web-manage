import { SetService } from './set.service'
import { ServiceRoute } from 'vue-service-app'
import {
  AddStaffBasicInfoParams
} from '@/api/v1/staff'

export class AddService extends SetService {
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getCountryCodes().subscribe(res => {
      console.log('mobel', res)
      next()
    })
  }

  // 新建基础信息
  addBasicInfo(params: AddStaffBasicInfoParams) {
    return this.addStaffBasicInfo(params)
  }
}
