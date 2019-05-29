import { Api } from '../../api'
import { AddStaffBasicInfoParams, EditStaffBasicInfoQuery } from '../staff'
// 门店维度下的员工
export class ShopStaffApi extends Api {
  /**
   * 员工所在部门列表
   */
  getStaffDepartmentList() {
    return this.http.get(`/v1/department/part`)
  }
  /**
     * 获取员工列表
     */
  getList(query: GetListQuery) {
    return this.http.get(`/v1/staff/shop`, { query })
  }
  /**
   * 添加员工基础信息
   */
  addStaffBasicInfo(params: AddStaffBasicInfoParams) {
    return this.http.post(`/v1/staff/shop/basic`, { params })
  }

  /**
   * 编辑员工回显
   */
  editStaffInfo(id:string) {
    return this.http.get(`/v1/staff/shop/review/${id}`)
  }

  /**
   * 修改员工基础信息
   */
  updateStaffBasicInfo(id: string, params: EditStaffBasicInfoQuery) {
    return this.http.put(`/v1/staff/shop/basic/${id}`, { params })
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
