import { Api } from '@/api/api'
export class CourseGroupApi extends Api {
  /**
   *小班课列表
   */
  getList(params: any) {
    return this.http.get('/v1/setting/course/small_course/reserve', { params })
  }
}
