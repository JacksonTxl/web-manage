import { Api } from '../../api'

export interface GetCourseListInput {
  search?:string,
  course_status?: number,
  start_time?: string,
  end_time?: string,
  size?: number,
  page?: number,
}
export class CourseApi extends Api {
  /**
   * 会员卡列表
   */
  getCourseList(params:GetCourseListInput, type:string) {
    return this.http.get(`/v1/sold/course/${type}`, { query: params })
  }
}
