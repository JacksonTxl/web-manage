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
  /**
   * 售出小班课转让回显
   */
  getTransferSmallCourseInfo(id: string) {
    return this.http.get(`/v1/sold/course/small_course/transfer/${id}`)
  }
  /**
   * 售出小班课转让
   */
  smallCourseTransfer(params: any, id: string) {
    return this.http.put(`/v1/sold/course/small_course/transfer/${id}`, {
      params
    })
  }
}
