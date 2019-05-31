import { Api } from '../../api'
import { AddStaffBasicInfoParams, EditStaffBasicInfoQuery, EditStaffDetailInfoQuery, EditStaffCoachInfoQuery } from '../staff'
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
   * 解除门店关系详情
   */
  getLeaveStoreInfo(id: string) {
    return this.http.get(`/v1/staff/shop/relation/${id}`)
  }

  /**
   * 确认解除关系
   */
  leaveStore(id: string) {
    return this.http.put(`/v1/staff/shop/remove/${id}`)
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

  /**
   * 修改员工详细信息
   */
  updateStaffDetailedInfo(id: string, params : EditStaffDetailInfoQuery) {
    return this.http.put(`/v1/staff/shop/detail/${id}`, { params })
  }

  /**
   * 修改教练信息
   */
  updateCoachInfo(id: string, params: EditStaffCoachInfoQuery) {
    return this.http.put(`/v1/staff/shop/coach/${id}`, { params })
  }

  /**
   * 绑定实体卡 / 重新绑定实体卡
   */
  bindcard(id: string) {
    return this.http.put(`/v1/staff/bind/physical/${id}`)
  }

  /**
   * 工资账户设置
   */
  bindbank(id: string, params: BindbankParams) {
    return this.http.put(`/v1/staff/bind/bank/${id}`, { params })
  }
}
interface CommonConfig {
    // 当前页
    page? : number;
    // 每页条数
    size? : number;
}
export interface BindbankParams{
  /**
   * 姓名
   */
  account_name : number;
  /**
   * 卡号
   */
  card_number: number;
  /**
   * 银行名称
   */
  bank_name: string;

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
