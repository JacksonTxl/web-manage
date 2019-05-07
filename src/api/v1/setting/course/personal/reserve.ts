import { Api } from '@/api/api'
const url = '/v1/setting/course/personal_reserve'

export class PersonReserveSettingApi extends Api {
  /**
   * 私教课程预约设置info
   */
  getInfo() {
    return this.http.get(url)
  }
  /**
   * 私教课课程预约设置编辑
   */
  update() {
    return this.http.put(url)
  }
}
