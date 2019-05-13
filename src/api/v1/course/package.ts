import { Api } from '../../api'

export interface OnsalePackageInput {
  id: string | number,
  start_time: string,
  end_time: string
}
export interface GetCourseInput {
  type: string,
  search?: string,
  course_type?: number
}
export class PackageApi extends Api {
  /**
   * 创建课程包
   * type：不限范围 unlimit  限制范围 range   固定范围  fixation
   */
  addCoursePackage(params: any, type: string) {
    return this.http.post(`/v1/course/package/${type}`, { params })
  }
  /**
   * 课程包修改回显
   * type：不限范围 unlimit  限制范围 range   固定范围  fixation
   */
  editCoursePackageInfo(type: string, package_course_id: string) {
    return this.http.get(`/v1/course/package/${type}/${package_course_id}`)
  }
  /**
   * 编辑课程包
   * type：不限范围 unlimit  限制范围 range   固定范围  fixation
   */
  editCoursePackage(params: any, type: string, package_course_id: string) {
    return this.http.put(`/v1/course/package/${type}/${package_course_id}`, { params })
  }
  /**
   * 课程包上架
   */
  onsaleCoursePackage(params:OnsalePackageInput) {
    return this.http.put(`/v1/course/package/onsale/${params.id}`, { params: {
      start_time: params.start_time,
      end_time: params.end_time
    } })
  }
  /**
   * 门店下课程列表
   */
  getCourseList(params:GetCourseInput) {
    return this.http.get(`/v1/course/package/${params.type}`, { query: {
      search: params.search,
      course_type: params.course_type
    } })
  }
  /**
   * 教练等级与教练数列表
   */
  getCoachList() {
    return this.http.get(`/v1/course/package/coach`)
  }
}
