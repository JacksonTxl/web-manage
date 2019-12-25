import { Api } from '@/api/api'
export class CourseGroupApi extends Api {
  /**
   *小班课列表
   */
  getList(params: any) {
    return this.http.get('/v1/course/small/list', { params })
  }
  addGroup(params: any) {
    return this.http.post('/v1/course/small', { params })
  }
  editGroup(params: any) {
    return this.http.put('/v1/course/small/' + params.id, { params })
  }
  setCoach(params: any) {
    return this.http.put('/v1/course/small/set_coach/' + params.course_id, {
      params
    })
  }
  setPrice(params: any) {
    return this.http.put('/v1/course/small/set_price/' + params.course_id, {
      params
    })
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
    return this.http.get('/v1/course/small/' + params)
  }
  /*
   * 小班课立即成班
   */
  beGroup(params: any) {
    return this.http.put('/v1/course/small/class_immediately/' + params)
  }
  getGroupCourseInfo(params: any) {
    return this.http.get('/v1/course/small/basic_info/' + params)
  }
  getGroupCourseHeaderInfo(params: any) {
    return this.http.get('/v1/course/small/heads/' + params)
  }
  getGroupClassInfo(params: any) {
    return this.http.get('/v1/course/small/class/' + params)
  }
  getCourseGroupClassUserInfo(query: any) {
    return this.http.get(`/v1/course/small/class_user_info/${query.id}`, {
      query
    })
  }
  getCourseEditInfo(query: any) {
    return this.http.get(`/v1/course/small/edit/${query.id}`)
  }
  /*
   * 小班课发布
   */
  publish(params: any) {
    return this.http.put('/v1/course/small/release/' + params)
  }
}
