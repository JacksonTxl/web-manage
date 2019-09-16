import { Api } from '../../api'

export interface GetCourseListInput {
  search?: string
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
  description: string
  courseInfo: Array<CourseInfo>
}
export interface FreezeCoursePackageInput {
  start_time: string
  end_time: string
  frozen_fee?: number
  frozen_pay_type?: number
}
export interface TransferCoursePackageInput {
  member_id?: number
  member_name?: string
  mobile?: string
  remain_price: number
  contract_number: string
  frozen_pay_type: number
  sold_type: number
}
export interface RefundCourseInput {
  refund_reason: number
  refund_price: number
  refund_channel: number
  description?: string
}
export interface EditCoursePersonalCoachInput {
  coach_id: string
  description?: string
}
export interface EditCoursePersonalRemainInput {
  remain_course: string
  description?: string
}
export class CourseApi extends Api {
  /**
   * 课列表
   */
  getCourseList(params: GetCourseListInput, type: string) {
    return this.http.get(`/v1/sold/course/${type}`, { query: params })
  }
  /**
   * 售出课程包编辑剩余课程回显
   */
  getCoursePackageEditInfo(id: string) {
    return this.http.get(`/v1/sold/course/package/${id}`)
  }
  /**
   * 售出课程包课时编辑
   */
  editCoursePackage(params: EditCoursePackageInput, id: string) {
    return this.http.put(`/v1/sold/course/package/${id}`, { params })
  }
  /**
   * 冻结售出课程包/私教课
   */
  getFreezeCourseInfo(id: string, type: string) {
    return this.http.get(`/v1/sold/course/${type}/frozen/${id}`)
  }
  /**
   * 冻结售出课程包/私教课
   */
  setActivatedCourse(params: any) {
    return this.http.get(`/v1/sold/course/personal/activated/${params.id}`, {
      params
    })
  }
  /**
   * 冻结售出课程包/私教课
   */
  setLeaseCourse(params: any) {
    return this.http.put(`/v1/sold/course/personal/lease/${params.id}`, {
      params
    })
  }
  /**
   * 售出私教课重新激活/延长结束时间详情页
   */
  getLeaseAndactivatedCourseInfo(id: string) {
    return this.http.get(`/v1/sold/course/personal/activated/${id}`)
  }
  /**
   * 冻结售出课程包/私教课
   */
  freezeCourse(params: FreezeCoursePackageInput, id: string, type: string) {
    return this.http.put(`/v1/sold/course/${type}/frozen/${id}`, {
      params
    })
  }
  /**
   * 取消冻结售出课程包/私教课
   */
  unFreezeCourse(id: string, type: string) {
    return this.http.put(`/v1/sold/course/${type}/unfrozen/${id}`)
  }
  /**
   * 售出 课程包/私教课 转让回显
   */
  getCourseTransferInfo(id: string, type: string) {
    return this.http.get(`/v1/sold/course/${type}/transfer/${id}`)
  }
  /**
   * 售出 课程包/私教课 转让
   */
  editCourseTransfer(
    params: TransferCoursePackageInput,
    id: string,
    type: string
  ) {
    return this.http.put(`/v1/sold/course/${type}/transfer/${id}`, {
      params
    })
  }
  /**
   * 售出 课程包/私教课 退款回显
   */
  getCourseRefundInfo(id: string, type: string) {
    return this.http.get(`/v1/sold/course/${type}/refund/${id}`)
  }
  /**
   * 售出 课程包/私教课 退款
   */
  editCourseRefund(params: RefundCourseInput, id: string, type: string) {
    return this.http.put(`/v1/sold/course/${type}/refund/${id}`, {
      params
    })
  }
  /**
   * 售出 课程包/私教课 详情
   */
  getCourseInfo(id: string, type: string) {
    return this.http.get(`/v1/sold/course/${type}/detail/${id}`)
  }
  /**
   * 售出 课程包/私教课 详情消费记录
   */
  getCourseConsumeInfo(id: string, type: string) {
    return this.http.get(`/v1/sold/course/${type}/consume/record/${id}`)
  }
  /**
   * 售出 课程包/私教课 详情操作日志
   */
  getCourseOperationInfo(id: string, type: string) {
    return this.http.get(`/v1/sold/course/${type}/operation/log/${id}`)
  }
  /**
   * 售出私教修改教练
   */
  editCoursePersonalCoach(params: EditCoursePersonalCoachInput, id: string) {
    return this.http.put(`/v1/sold/course/personal/coach/${id}`, {
      params
    })
  }
  /**
   * 售出私教修改课时
   */
  editCoursePersonalRemain(params: EditCoursePersonalRemainInput, id: string) {
    return this.http.put(`/v1/sold/course/personal/remain/${id}`, {
      params
    })
  }
}
