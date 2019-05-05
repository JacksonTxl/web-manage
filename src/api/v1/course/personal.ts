import { Api } from '../../api'

export class PersonalCourseApi extends Api {
  /**
   * 获取私教课全局设置
   */
  getSetting() {
    return this.http.get('/v1/course/personal/setting')
  }
}
