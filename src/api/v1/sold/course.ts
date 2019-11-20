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
    return this.http.put(`/v1/sold/course/personal/activated/${params.id}`, {
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
   * 售出私教课重新激活详情页
   */
  getActivatedCourseInfo(id: string) {
    return this.http.get(`/v1/sold/course/personal/activated/${id}`)
  }
  /**
   * 售出私教课延长结束时间详情页
   */
  getLeaseCourseInfo(id: string) {
    return this.http.get(`/v1/sold/course/personal/lease/${id}`)
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
  getCourseOperationInfo(query: any, type: string) {
    return this.http.get(`/v1/sold/course/${type}/operation/log/${query.id}`, {
      query
    })
  }
  /**
   * 售出 课程包/私教课 详情使用记录
   */
  getCardsUsageLog(query: any, type: string) {
    return this.http.get(`/v1/sold/course/${type}/usage/log/${query.id}`, {
      query
    })
  }
  /**
   * 售出 课程包 详情使用记录
   */
  getPackageUsageLog(query: any) {
    return this.http.get(`/v1/course/package/cost/detail`, {
      query
    })
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
  /**
   * 售出私教课批量赠送，当前搜索条件下 获取操作条数
   */
  fetchSoldCourseValidNum(params: any) {
    return this.http.get(`/v1/sold/course/personal/task_num`, {
      query: params
    })
  }
  /**
   * 售出私教课批量赠送
   */
  taskAddCourseNum(params: any) {
    return this.http.post(`/v1/sold/course/personal/task_add_courses`, {
      params
    })
  }
  /**
   * 售出私教课延长有效期
   */
  taskExtendDays(params: any) {
    return this.http.post(`/v1/sold/course/personal/task_extend_time`, {
      params
    })
  }
  /**
   * 售出课程包，当前搜索条件下 获取操作条数
   */
  fetchSoldPackageValidNum(params: any) {
    return this.http.get(`/v1/sold/course/package/task_num`, {
      query: params
    })
  }
  /**
   * 售出课程包，更换课程上课范围
   */
  changePackageRange(params: any) {
    return this.http.post(`/v1/sold/course/package/task_package_range`, {
      params
    })
  }
  /**
   * 售出课程包，获取全部私教课上课列表
   */
  geAllPersonalCourseList() {
    return this.http.get(`/v1/course/package/personal_all`)
  }
}
