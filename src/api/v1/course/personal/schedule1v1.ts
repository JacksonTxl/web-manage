
import { Api } from '@/api/api'
/**
 *
 *
 * @export
 * @class ScheduleApi
 * @extends {Api}
 * 团体课排期接口
 */
export class ScheduleApi1v1 extends Api {
  getSchedulePersonalList() {
    this.http.get('v1/schedule/personal/list')
  }
}
