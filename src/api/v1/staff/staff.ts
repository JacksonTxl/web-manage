import { Api } from '../../api'
import { AddStaffBasicInfoParams, EditStaffBasicInfoQuery, EditStaffDetailInfoQuery, EditStaffCoachInfoQuery } from '../staff'
// 门店维度下的员工
export class ShopStaffApi extends Api {
  /**  */
  getRePassword(id: string) {
    return this.http.get(`/v1/staff/shop/account/${id}`)
  }
  rePassword(params: RePasswordInput) {
    return this.http.put(`/v1/staff/shop/password/${params.id}`, { params })
  }
  setAccount(params: RePasswordInput) {
    return this.http.put(`/v1/staff/shop/account/${params.id}`, { params })
  }
  getStaffBrandPosition(query: any) {
    return this.http.get(`/v1/staff/shop/position/${query.id}`)
  }
  /**
   * 员工所在部门列表
   */
  getStaffDepartmentList() {
    return this.http.get(`/v1/department`)
  }
  // 搜搜部门列表
  searchDepartment(query: any) {
    console.log('search', query)
    return this.http.get(`/v1/department/search`, { query })
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
  putStaffBindPhysical(params: PutStaffBindPhysicalInput) {
    return this.http.put(`/v1/staff/bind/physical/${params.id}`, { params })
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
  bindCard(id: string) {
    return this.http.put(`/v1/staff/bind/physical/${id}`)
  }
  getBankInfo(params: string) {
    return this.http.get(`/v1/staff/brand/bank/${params}`)
  }
  putStaffBindBank(params: PutStaffBindBankInput) {
    return this.http.put(`/v1/staff/bind/bank/${params.id}`, { params })
  }

  /**
   * 工资账户设置
   */
  bindBank(id: string, params: BindBankParams) {
    return this.http.put(`/v1/staff/bind/bank/${id}`, { params })
  }
  // 员工详情公共头
  getStaffInfoCommonHeader(id: string) {
    return this.http.get(`/v1/staff/shop/common/${id}`)
  }
  // 员工详情上课记录
  getStaffCourseList(id: string, query: GetStaffCourseListInput) {
    return this.http.get(`/v1/staff/shop/courses_record/${id}`, { query })
  }
  // 员工详情跟进记录
  getStaffFollow(query: GetStaffFollowInput) {
    return this.http.get(`/v1/staff/shop/follow/${query.id}`, { query })
  }
  // 员工详情售卖订单
  getStaffSold(id: string, query: GetStaffSoldInput) {
    return this.http.get(`/v1/staff/shop/order/${id}`, { query })
  }
  // 员工详情服务课程
  getStaffServiceCourses(query: GetStaffServiceCoursesInput) {
    return this.http.get(`/v1/staff/shop/course/${query.id}`, { query })
  }
  // 员工详情员工资料
  getStaffInfo(id: string) {
    return this.http.get(`/v1/staff/shop/basic/${id}`)
  }
  // 员工擅长项目
  getStaffSpecialty() {
    return this.http.get(`/v1/staff/specialty`)
  }
  // 修改开通系统权限字段
  updatepermission(id: Number, params: PermissionInput) {
    return this.http.put(`/v1/staff/brand/permission/${id}`, { params })
  }
}
export interface PermissionInput {
  is_permission: number
}
interface CommonConfig {
    // 当前页
    page? : number;
    // 每页条数
    size? : number;
}
export interface BindBankParams{
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
export interface GetStaffFollowInput {
  id?: string
  /**
   * 搜索开始时间
   */
  follow_date_first?: string;
  /**
   * 搜索结束时间
   */
  follow_date_last?: string;
  /**
   * 搜索用户时间
   */
  member_name?: string;

  page?: number;
  size?: number;
}
export interface GetStaffServiceCoursesInput {
  id: string
  /**
   * 门店id
   */
  shop_id?: number;
  /**
   * 搜索关键字
   */
  keyword?: string;

  page?: number;
  size?: number;
}
export interface PutStaffBrandQuitInput {
  id: string | number
  quit_time: string
}
export interface PutStaffBindBankInput {
  id?: string | number
  account_name: string
  card_number: string
  bank_name: string
}
export interface PutStaffBrandRestartInput {
  id: string | number
  restart_time: string
}
export interface GetStaffCourseListInput {
  /**
   * 门店id
   */
  shop_id?: number;
  /**
   * 上课状态
   */
  course_status?: number;
  /**
   * 开始上课日期
   */
  start_time_first?: string;
  /**
   * 结束上课日期
   */
  start_time_last?: string;
  /**
   * 搜索课程名称
   */
  course_name?: string;
}
export interface PutStaffBindPhysicalInput {
  id?: string
  card_number?: string
  physical_number?: string
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
export interface RePasswordInput {
  id?: string,
  name: string,
  password: string,
  password_repeat: string
}

export interface GetStaffSoldInput {
  /**
   * 门店id
   */
  shop_id?: number;
  /**
   * 订单状态
   */
  order_status?: number;
  /**
   * 开始下单时间
   */
  order_time_first?: string;
  /**
   * 结束下单时间
   */
  order_time_last?: string;
  /**
   * 搜索关键字
   */
  keyword?: string;

  page?: number;
  size?: number;
}
