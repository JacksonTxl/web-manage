import { Api } from '../../api'

export interface GetCourseListInput {
  search?:string
  course_status?: number
  start_time?: string
  end_time?: string
  size?: number
  page?: number
}
export interface CourseInfo {
  id: number
  course_num_remain: number
}
export interface EditCoursePackageInput {
  description:string
  courseInfo:Array<CourseInfo>
}
export interface FreezeCoursePackageInput {
  start_time:string
  end_time:string
  frozen_fee?:number
  frozen_pay_type?:number
}
export interface TransferCoursePackageInput {
  member_id?:number
  member_name?:string
  mobile?:string
  start_time:string
  remain_price:number
  contract_number:string
  frozen_pay_type:number
  sold_type:number
}
export interface RefundCoursePackageInput {
  refund_reason:number
  refund_price:number
  frozen_pay_type:number
  description?:string
}
export class CourseApi extends Api {
  /**
   * 课列表
   */
  getCourseList(params:GetCourseListInput, type:string) {
    return this.http.get(`/v1/sold/course/${type}`, { query: params })
  }
  /**
   * 售出课程包编辑剩余课程回显
   */
  getCoursePackageEditInfo(id:string) {
    return this.http.get(`/v1/sold/course/package/${id}`)
  }
  /**
   * 售出课程包课时编辑
   */
  editCoursePackage(params:EditCoursePackageInput, id:string) {
    return this.http.put(`/v1/sold/course/package/${id}`, { params })
  }
  /**
   * 冻结售出课程包
   */
  freezeCoursePackage(params:FreezeCoursePackageInput, id:string) {
    return this.http.put(`/v1/sold/course/package/frozen/${id}`, { params })
  }
  /**
   * 取消冻结售出课程包
   */
  unFreezeCoursePackage(id:string) {
    return this.http.put(`/v1/sold/course/package/unfrozen/${id}`)
  }
  /**
   * 售出课程包转让回显
   */
  getCoursePackageTransferInfo(id:string) {
    return this.http.get(`/v1/sold/course/package/transfer/${id}`)
  }
  /**
   * 售出课程包转让
   */
  editCoursePackageTransfer(params:TransferCoursePackageInput, id:string) {
    return this.http.put(`/v1/sold/course/package/transfer/${id}`, { params })
  }
  /**
   * 售出课程包退款回显
   */
  getCoursePackageRefundInfo(id:string) {
    return this.http.get(`/v1/sold/course/package/refund/${id}`)
  }
  /**
   * 售出课程包退款回显
   */
  editCoursePackageRefund(params:RefundCoursePackageInput, id:string) {
    return this.http.put(`/v1/sold/course/package/refund/${id}`, { params })
  }
  /**
   * 售出课程包详情
   */
  getCoursePackageInfo(id:string) {
    return this.http.get(`/v1/sold/course/package/detail/${id}`)
  }
}
