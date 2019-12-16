import { Api } from '@/api/api'
export class CourseGroupApi extends Api {
  /**
   *小班课列表
   */
  getList(params: any) {
    return this.http.get('/v1/course/small-course/list', { params })
  }
  addGroup(params: any) {
    return this.http.post('/v1/course/small-course', { params })
  }
  setCoach(params: any) {
    return this.http.put(
      '/v1/course/small-course/set-coach/' + params.course_id,
      { params }
    )
  }
  setPrice(params: any) {
    return this.http.put(
      '/v1/course/small-course/set-price/' + params.course_id,
      { params }
    )
  }
  /*
   * 获取小班课范围列表
   */
  getCourseGroupRangeList(params: any) {
    return this.http.get('/v1/setting/course/scope', { params })
  }
  getCourseStaffList(params: any) {
    return this.http.get('/v1/staff/shop', { params })
  }
  /*
   * 删除小班课
   */
  deleteGroup(params: any) {
    return this.http.get('/v1/course/small-course/' + params)
  }
  /*
   * 小班课立即成班
   */
  beGroup(params: any) {
    return this.http.put('/v1/course/small-course/class-immediately/' + params)
  }
  getGroupCourseInfo(params: any) {
    return this.http.get('/v1/course/small-course/' + params)
  }
  getGroupClassInfo(params: any) {
    return this.http.get('/v1/course/small-course/class/' + params)
  }
  getCourseGroupClassUserInfo(params: any) {
    return this.http.get(
      '/v1/course/small-course/class-user-info/' + params.id,
      { params }
    )
  }
}
