import { Api } from '@/api/api'

export class ScheduleApi extends Api {
  /**
   * 获取门店私教课列表
   */
  getCourseList() {
    return this.http.get('/v1/schedule/personal/course')
  }
  /**
   * 获取教练列表
   */
  getCoachList() {
    return this.http.get('/v1/schedule/personal_team/shop/coach_list')
  }
}
