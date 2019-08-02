import { DelDepartmentInput } from './staff'
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
export interface SaveData {
  /**
   * 姓名
   */
  staff_name: string
  /**
   * 昵称
   */
  nickname: string
  /**
   * 国家编码id，例如中国的id是37 就手机号前边的那个
   */
  country_code_id: string
  /**
   * 手机号
   */
  mobile: string
  /**
   * 工号
   */
  staff_num: string
  /**
   * 性别
   */
  sex: string
  /**
   * 证件类型 1-身份证 2-护照
   */
  id_type?: string
  /**
   * 证件类型
   */
  id_number: string
  /**
   * 员工头像
   */
  image_avatar?: string
  /**
   * 员工人脸
   */
  image_face?: string
  /**
   * 部门id
   */
  department_id: string
  /**
   * 职务
   */
  working_post: string
  /**
   * 身份
   */
  identity?: Array<number>
  /**
   * 教练等级
   */
  coach_level_id?: string
  /**
   * 工作性质
   */
  nature_work: string
  /**
   * 入职时间
   */
  entry_date?: string
  /**
   * 角色id
   */
  role_id: Array<number>
  /**
   * 门店id
   */
  shop_id: Array<number>
  /**
   * 系统使用权限
   */
  is_permission?: string
  /**
   * 登陆账号
   */
  account?: string
  /**
   * 登陆密码
   */
  password?: string
  /**
   * 确认密码
   */
  repeat_password?: string
}
export interface EditStaffBasicInfoQuery {
  /**
   * 员工id
   */
  staff_id: number
  /**
   * 相册id
   */
  album_id: number
  /**
   * 员工头像
   */
  image_avatar?: object
  /**
   * 员工人脸
   */
  image_face?: object
  /**
   * 员工姓名
   */
  staff_name: string
  /**
   * 员工昵称
   */
  nickname: string
  /**
   * 国家编码id
   */
  country_code_id: number
  /**
   * 手机号
   */
  mobile: string
  /**
   * 员工工号
   */
  staff_num: string
  /**
   * 员工性别
   */
  sex: number
  /**
   * 证件类型
   */
  id_type?: number
  /**
   * 证件号码
   */
  id_number: number
  /**
   * 部门id
   */
  department_id: number
  /**
   * 工作性质
   */
  nature_work: number
  /**
   * 入职时间
   */
  entry_date?: string
  /**
   * 角色Id
   */
  role_id: number[]
  /**
   * 门店id
   */
  shop_id: number[]
}
export interface EditStaffDetailInfoQuery {
  /**
   * 毕业院校
   */
  graduated_school?: string
  /**
   * 毕业时间
   */
  graduation_time?: string
  /**
   * 学历
   */
  education?: number
  /**
   * 专业
   */
  profession?: number
  /**
   * 生日
   */
  birthday?: string
  /**
   * 籍贯
   */
  native_place?: string
  /**
   * 婚姻状态
   */
  marry_status?: number
  /**
   * 有无子女
   */
  children_status?: number
  /**
   * 详细地址
   */
  address?: string
  /**
   * 描述
   */
  description?: string
  /**
   * 省id
   */
  province_id?: number
  /**
   * 省名字
   */
  province_name?: string
  /**
   * 市Id
   */
  city_id?: number
  /**
   * 市名
   */
  city_name?: string
  /**
   * 区id
   */
  district_id?: number
  /**
   * 区名
   */
  district_name?: string
}
export interface EditStaffCoachInfoQuery {
  /**
   * 从业时间
   */
  employment_time?: string
  /**
   * 擅长的项目
   */
  specialty_id?: number[]
  /**
   * 专业认证
   */
  certification_name?: string[]
  /**
   * 个人简介
   */
  introduction?: string
  /**
   * 是否展示在会员端
   */
  is_show: number
  /**
   * 员工风采
   */
  image_personal: any[]
}
export interface RePasswordInput {
  id?: string
  name: string
  password: string
  password_repeat: string
}
export interface PutStaffBindPositionInput {
  id?: string
  nature_work: number
  identity: any[]
  coach_level_id: number
  basic_salary: number
  sale_percentage: number
  class_percentage: number
}
export interface UpdateDepartmentInput {
  id: string | number
  department_name: string
}
export interface AddDepartmentInput {
  parent_id: number
  department_name: string
}
export interface DelDepartmentInput {
  id: string | number
  check_result: number
}
const URL = '/v1/staff/brand'
const DEPARTMENT_URL = '/v1/department'
const mock = {}
export class StaffApi extends Api {
  getDepartmentList() {
    return this.http.get(DEPARTMENT_URL)
  }
  addDepartment(params: AddDepartmentInput) {
    return this.http.post(DEPARTMENT_URL, { params })
  }
  updateDepartment(params: UpdateDepartmentInput) {
    return this.http.put(`${DEPARTMENT_URL}/${params.id}`, { params })
  }
  delDepartment(params: DelDepartmentInput) {
    return this.http.delete(`${DEPARTMENT_URL}/${params.id}`)
  }

  /**
   * 获取门店
   */
  getShopList() {
    return this.http.get('/v1/shop/all')
  }
  /**  */
  getRePassword(id: string) {
    return this.http.get(`/v1/staff/brand/account/${id}`)
  }
  rePassword(params: RePasswordInput) {
    return this.http.put(`/v1/staff/brand/password/${params.id}`, { params })
  }
  setAccount(params: RePasswordInput) {
    return this.http.put(`/v1/staff/brand/account/${params.id}`, { params })
  }
  getBankInfo(params: string) {
    return this.http.get(`/v1/staff/brand/bank/${params}`)
  }
  putStaffBindBank(params: PutStaffBindBankInput) {
    return this.http.put(`/v1/staff/bind/bank/${params.id}`, { params })
  }
  putStaffBindPosition(params: PutStaffBindPositionInput) {
    return this.http.put(`/v1/staff/bind/position/${params.id}`, { params })
  }
  getStaffSalaryBasic() {
    return this.http.get(`/v1/staff/salary/basic`)
  }
  getStaffSalarySale() {
    return this.http.get(`/v1/staff/salary/sale`)
  }
  getStaffSalaryCourse() {
    return this.http.get(`/v1/staff/salary/course`)
  }
  // 获取某部门员工列表
  getStaffBrandList(query: Params) {
    return this.http.get(URL, { query })
  }
  // 获取手机号区域
  getCountryCodes() {
    return this.http.get('/country/codes')
  }
  // 添加某部门员工
  addStaffBrandInfo(params: SaveData) {
    return this.http.post(URL, { params })
  }
  // 获取编辑员工回显
  getStaffBrandReview(id: number) {
    return this.http.get(`/v1/staff/brand/review/${id}`)
  }
  // 修改员工基础信息
  updateStaffBasicInfo(id: number, params: EditStaffBasicInfoQuery) {
    return this.http.put(`/v1/staff/brand/basic/${id}`, { params })
  }
  // 修改员工详细信息
  updateStaffDetailInfo(id: number, params: EditStaffDetailInfoQuery) {
    return this.http.put(`/v1/staff/brand/detail/${id}`, { params })
  }
  // 修改教练信息
  updateStaffCoachInfo(id: number, params: EditStaffCoachInfoQuery) {
    return this.http.put(`/v1/staff/brand/coach/${id}`, { params })
  }

  // 新建员工基础信息
  addStaffBasicInfo(params: AddStaffBasicInfoParams) {
    return this.http.post(`/v1/staff/brand/basic`, { params })
  }

  // 编辑员工信息
  updateStaffBrandInfo(params: SaveData) {
    return this.http.put(URL, { params })
  }
  // 删除员工
  deleteStaffBrandInfo(id: string) {
    return this.http.delete(`${URL}/${id}`)
  }

  /**
   * 员工职位/工资账户信息（复显）
   */
  getStaffBrandPosition(query: any) {
    return this.http.get(`/v1/staff/brand/position/${query.id}`)
  }
  // 提交更改员工职位
  bindStaffPosition(id: string, params: any) {
    return this.http.put(`/v1/staff/bind/position/${id}`, { params })
  }

  // 查看员工详情
  staffDetailInfo(id: string) {
    return this.http.get(`/v1/staff/brand/${id}`)
  }
  putStaffBindPhysical(params: PutStaffBindPhysicalInput) {
    return this.http.put(`/v1/staff/bind/physical/${params.id}`, { params })
  }
  getStaffCheckJob(params: string) {
    return this.http.get(`/v1/staff/check/job/${params}`)
  }
  putStaffBrandQuit(params: PutStaffBrandQuitInput) {
    return this.http.put(`/v1/staff/brand/quit/${params.id}`, { params })
  }
  putStaffBrandRestart(params: PutStaffBrandRestartInput) {
    return this.http.put(`/v1/staff/brand/restart/${params.id}`, { params })
  }
  // /v1/staff/salary/sale
  // /v1/staff/salary/sale
  // /v1/staff/salary/class
  /**
   * 编辑员工回显
   */
  editStaffInfo(id: string) {
    return this.http.get(`/v1/staff/brand/review/${id}`)
  }

  // 员工详情公共头
  getStaffInfoCommonHeader(id: string) {
    return this.http.get(`/v1/staff/brand/common/${id}`)
  }
  // 员工详情上课记录
  getStaffCourseList(id: string, query: GetStaffCourseListInput) {
    return this.http.get(`/v1/staff/brand/courses-record/${id}`, { query })
  }
  // 员工详情跟进记录
  getStaffFollow(query: GetStaffFollowInput) {
    return this.http.get(`/v1/staff/brand/follow/${query.id}`, { query })
  }
  // 员工详情售卖订单
  getStaffSold(id: string, query: GetStaffSoldInput) {
    return this.http.get(`/v1/staff/brand/order/${id}`, { query })
  }
  // 员工详情服务课程
  getStaffServiceCourses(id: string, query: GetStaffServiceCoursesInput) {
    return this.http.get(`/v1/staff/brand/course/${id}`, { query })
  }
  // 员工详情员工资料
  getStaffInfo(id: string) {
    return this.http.get(`/v1/staff/brand/basic/${id}`)
  }
  /**
   * 获取当前登录员工的全局信息
   */
  getGlobalStaffInfo() {
    return this.http.get('/v1/staff/info')
  }
  // 验证删除职能
  validatStaffPosition(staff_id: Number, id: Number) {
    return this.http.get(`/v1/staff/check/${staff_id}/position/${id}`)
  }
  // 批量导入员工
  transferBrand(params: TransferBrandInput) {
    return this.http.put(`/v1/staff/brand/transfer`, { params })
  }
  // 修改开通系统权限字段
  updatepermission(id: Number, params: PermissionInput) {
    return this.http.put(`/v1/staff/brand/permission/${id}`, { params })
  }
  /**
   * 修改人脸
   */
  updateUserFace(id: number, params: EditFaceParams) {
    return this.http.put(`/v1/staff/face/${id}`, { params })
  }
}
export interface EditFaceParams {
  image_id: number
  image_key: string
}

export interface PermissionInput {
  is_permission: number
}
export interface TransferBrandInput {
  ids: number[]
  department_id: number
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
export interface PutStaffBrandQuitInput {
  id: string | number
  quit_time: string
}
export interface PutStaffBindPhysicalInput {
  id?: string
  card_number?: string
  physical_number?: string
}
// 品牌
export interface GetStaffCourseListInput {
  /**
   * 门店id
   */
  shop_id?: number
  /**
   * 上课状态
   */
  course_status?: number
  /**
   * 开始上课日期
   */
  start_time_first?: string
  /**
   * 结束上课日期
   */
  start_time_last?: string
  /**
   * 搜索课程名称
   */
  course_name?: string
}
export interface GetStaffServiceCoursesInput {
  /**
   * 门店id
   */
  shop_id?: number
  /**
   * 搜索关键字
   */
  keyword?: string

  page?: number
  size?: number
}
export interface GetStaffSoldInput {
  /**
   * 门店id
   */
  shop_id?: number
  /**
   * 订单状态
   */
  order_status?: number
  /**
   * 开始下单时间
   */
  order_time_first?: string
  /**
   * 结束下单时间
   */
  order_time_last?: string
  /**
   * 搜索关键字
   */
  keyword?: string

  page?: number
  size?: number
}
export interface GetStaffFollowInput {
  id?: string | number
  /**
   * 搜索开始时间
   */
  follow_date_first?: string
  /**
   * 搜索结束时间
   */
  follow_date_last?: string
  /**
   * 搜索用户时间
   */
  member_name?: string

  page?: number
  size?: number
}
export interface AddStaffBasicInfoParams {
  /**
   * 员工
   */
  staff_name: string
  /**
   * 昵称
   */
  nickname: string
  /**
   * 国家编码
   */
  country_code_id: number
  /**
   * 手机号
   */
  mobile: string
  /**
   * 邮箱
   */
  mail?: string
  /**
   * 性别
   */
  sex: number
  /**
   * 工号
   */
  staff_num: string
  /**
   * 证件类型
   */
  id_type?: number
  /**
   * 证件号码
   */
  id_number: number
  /**
   * 部门Id
   */
  department_id: number
  /**
   * 员工头像
   */
  image_avatar?: object
  /**
   * 员工人脸
   */
  image_face?: object
  /**
   * 职务
   */
  working_post: string
  /**
   * 身份
   */
  identity?: number[]
  /**
   * 教练等级Id
   */
  coach_level_id?: number
  /**
   * 工作性质
   */
  nature_work?: number
  /**
   * 入职时间
   */
  entry_date?: string
  /**
   * 角色id
   */
  role_id: number[]
  /**
   * 门店id
   */
  shop_id: number[]
  /**
   * 系统使用权限
   */
  is_permission: number
  /**
   * 登陆账号
   */
  account?: string
  /**
   * 登陆密码
   */
  password?: string
  /**
   * 确认密码
   */
  repeat_password?: string
}
