import { Api } from '../../api'

export class SmallCourseApi extends Api {
  /**
   * 小班课列表
   */
  getSmallCourseList(params: any) {
    return this.http.get(`/v1/sold/course/small_course`, { query: params })
  }
  /**
   * 售出小班课详情
   */
  getSmallCourseInfo(id: string) {
    return this.http.get(`/v1/sold/course/small_course/detail/${id}`)
  }
}
