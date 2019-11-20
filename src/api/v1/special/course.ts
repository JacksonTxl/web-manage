import { Api } from '@/api/api'

export class CourseApi extends Api {
  /**
   * 课程类型列表
   */
  getCourseCategoryList(query = {}) {
    return this.http.get('/v1/special/course/category', {
      query: Object.assign(
        {
          size: 100
        },
        query
      )
    })
  }
}
