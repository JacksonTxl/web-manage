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
  EditCoursePackage(params:EditCoursePackageInput, id:string) {
    return this.http.put(`/v1/sold/course/package/${id}`, { params })
  }
}
