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
}
