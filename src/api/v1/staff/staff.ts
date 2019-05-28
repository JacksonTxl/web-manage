import { Api } from '../../api'

// 门店维度下的员工
export class ShopStaffApi extends Api {
  /**
     * 获取员工列表
     */
  getList(query: GetListQuery) {
    return this.http.get(`/v1/staff/brand`, { query })
  }
}
interface CommonConfig {
    // 当前页
    page? : number;
    // 每页条数
    size? : number;
}
export interface GetListQuery extends CommonConfig{
    /**
     * 门店id
     */
    shop_id? : number;
    /**
     * 员工状态
     */
    work_status? : number;

}
