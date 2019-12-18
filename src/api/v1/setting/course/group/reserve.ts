import { Api } from '@/api/api'
export class GroupReserveSettingApi extends Api {
  /**
   * 获取小班课课程预约设置信息
   */
  getInfo() {
    return this.http.get('/v1/setting/course/small_course/reserve')
  }
  /**
   * 小班课课程预约设置编辑
   */
  editInfo(params: any) {
    return this.http.put('/v1/setting/course/small_course/reserve', { params })
  }
}
