import { SetService } from './set.service'
import { ServiceRoute } from 'vue-service-app'
import { EditStaffBasicInfoQuery, EditStaffDetailInfoQuery } from '../../../../api/v1/staff'

export class EditService extends SetService {
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    console.log('this', this)
    this.getCountryCodes().subscribe(res => {
      console.log('mobel', res)
    })
    this.getStaffBrandReview(36).subscribe(res => {
      this.SET_STAFF_BRND(res)
      next()
    })
  }
  // 提交基础信息
  editBasicInfo(id: number, params : EditStaffBasicInfoQuery) {
    return this.editStaffBasicInfo(36, params)
  }
  // 提交详细信息
  editDetailInfo(id: number, params : EditStaffDetailInfoQuery) {
    return this.editStaffDetailInfo(36, params
    )
  }
}
