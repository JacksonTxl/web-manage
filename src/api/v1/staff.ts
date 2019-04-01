import { Api } from '../api'
/**
 * @export
 * @interface Params
 *
 */
export interface Params {
    /**
     * 员工状态
     */
    staff_status?: string
    /**
     * 员工工号 姓名 手机号
     */
    keyword?: string
    /**
     * 第几页
     */
    page?: string
      /**
       * 每页显示数
       */
    limit?: string
  }

export class StaffApi extends Api {
  getDetail(query: Params) {
    return this.http.get('/v1/staff/manage/staff-list', { query })
  }
}
