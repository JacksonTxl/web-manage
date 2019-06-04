import { SetService } from './set.service'
import { ServiceRoute } from 'vue-service-app'
import { EditStaffBasicInfoQuery, EditStaffDetailInfoQuery, EditStaffCoachInfoQuery } from '../../../../api/v1/staff'

export class EditService extends SetService {
  beforeRouteUpdate(to: ServiceRoute, from: ServiceRoute, next: any) {
    // 格式化后的query快照对象 可使用此对象进行请求
    console.log(to)
    next()
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    let { staffId } = to.query
    this.getCountryCodes().subscribe(res => {
      console.log('mobel', res)
    })
    this.getStaffBrandReview(staffId).subscribe(res => {
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
    return this.editStaffDetailInfo(36, params)
  }
  // 提交教练信息
  editCoachInfo(id: number, params: EditStaffCoachInfoQuery) {
    return this.editStaffCoachInfo(36, params)
  }
}
