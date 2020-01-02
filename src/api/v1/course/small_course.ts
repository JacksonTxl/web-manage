import { Api } from '@/api/api'
export class CourseGroupApi extends Api {
  /**
   *小班课列表
   */
  getList(query: any) {
    return this.http.get('/v1/course/small/list', { query })
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
  getCourseGroupRangeList() {
    return this.http.get('/v1/setting/course/scope')
  }
  getCourseStaffList(params: any) {
    return this.http.get('/v1/staff/shop', { params })
  }
  /*
   * 删除小班课
   */
  deleteGroup(id: string) {
    return this.http.delete('/v1/course/small/' + id)
  }
  /*
   * 小班课立即成班
   */
  beGroup(id: string) {
    return this.http.put('/v1/course/small/class_immediately/' + id)
  }
  getGroupCourseInfo(id: string) {
    return this.http.get('/v1/course/small/basic_info/' + id)
  }
  getGroupCourseHeaderInfo(id: string) {
    return this.http.get('/v1/course/small/heads/' + id)
  }
  getGroupClassInfo(id: string) {
    return this.http.get('/v1/course/small/class/' + id)
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
  publish(id: any) {
    return this.http.put('/v1/course/small/release/' + id)
  }
}
