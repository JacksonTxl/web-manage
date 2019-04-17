import { Api } from '../../api'

export class CourseApi extends Api {
  /**
   * 课程类型列表
   */
  getCourseTypes() {
    return this.http.get('/v1/setting/course')
  }
}
