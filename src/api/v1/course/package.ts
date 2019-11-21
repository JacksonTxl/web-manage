import { Api } from '../../api'

export interface OnsalePackageInput {
  id: string | number
  start_time: string
  end_time: string
}
export interface GetCourseInput {
  type: string
  search?: string
  course_type?: number
}
export interface GetPackageListInput {
  package_type?: number
  shelf_status?: number
  course_name?: string
  page?: number
  size?: number
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
   * 课程包详情
   * type：不限范围 unlimit  限制范围 range   固定范围  fixation
   */
  getCoursePackageInfo(type: string, package_course_id: string) {
    return this.http.get(
      `/v1/course/package/${type}/detail/${package_course_id}`
    )
  }
  /**
   * 编辑课程包
   * type：不限范围 unlimit  限制范围 range   固定范围  fixation
   */
  editCoursePackage(params: any, type: string, package_course_id: string) {
    return this.http.put(`/v1/course/package/${type}/${package_course_id}`, {
      params
    })
  }
  /**
   * 课程包上架
   */
  onsaleCoursePackage(params: OnsalePackageInput) {
    return this.http.put(`/v1/course/package/onsale/${params.id}`, {
      params: {
        start_time: params.start_time,
        end_time: params.end_time
      }
    })
  }
  /**
   * 课程包下架
   */
  offsaleCoursePackage(id: string) {
    return this.http.put(`/v1/course/package/offsale/${id}`)
  }
  /**
   * 课程包删除
   */
  deleteCoursePackage(id: string) {
    return this.http.delete(`/v1/course/package/${id}`)
  }
  /**
   * 课程包列表
   */
  getList(params: GetPackageListInput) {
    return this.http.get(`/v1/course/package`, { query: params })
  }
  /**
   * 门店下课程列表
   */
  getCourseList(params: GetCourseInput) {
    return this.http.get(`/v1/course/package/${params.type}`, {
      query: {
        search: params.search,
        course_type: params.course_type
      }
    })
  }
  /**
   * 门店下所有课程列表
   */
  geAlltCourseList() {
    return this.http.get(`/v1/course/package/course_all`)
  }
  /**
   * 教练等级与教练数列表
   */
  getCoachList() {
    return this.http.get(`/v1/course/package/coach`)
  }
}
