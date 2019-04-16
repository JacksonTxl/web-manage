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
    staff_name : string;
    /**
     * 昵称
     */
    nickname : string;
    /**
     * 国家编码id，例如中国的id是37 就手机号前边的那个
     */
    country_code_id : string;
    /**
     * 手机号
     */
    mobile : string;
    /**
     * 工号
     */
    staff_num : string;
    /**
     * 性别
     */
    sex : string;
    /**
     * 证件类型 1-身份证 2-护照
     */
    id_type? : string;
    /**
     * 证件类型
     */
    id_number : string;
    /**
     * 员工头像
     */
    image_avatar? : string;
    /**
     * 员工人脸
     */
    image_face? : string;
    /**
     * 部门id
     */
    department_id : string;
    /**
     * 职务
     */
    working_post : string;
    /**
     * 身份
     */
    identity? : Array<number>;
    /**
     * 教练等级
     */
    coach_level_id? : string;
    /**
     * 工作性质
     */
    nature_work : string;
    /**
     * 入职时间
     */
    entry_date? : string;
    /**
     * 角色id
     */
    role_id: Array<number>;
    /**
     * 门店id
     */
    shop_id: Array<number>;
    /**
     * 系统使用权限
     */
    is_permission? : string;
    /**
     * 登陆账号
     */
    account? : string;
    /**
     * 登陆密码
     */
    password? : string;
    /**
     * 确认密码
     */
    repeat_password? : string;
}
const URL = '/v1/staff/brand'
const mock = {}
export class StaffApi extends Api {
  // 获取某部门员工列表
  getStaffBrandList(query: Params) {
    return this.http.get(URL, { query, mock })
  }
  // 获取手机号区域
  getCountryCodes() {
    return this.http.get('/country/codes')
  }
  // 添加某部门员工
  addStaffBrandInfo(params: SaveData) {
    return this.http.post(URL, { params })
  }
  // 获取员工详情
  getStaffBrandInfo(id: string) {
    return this.http.get(`${URL}${id}`)
  }
  // 获取编辑员工回显
  getStaffBrandReview(id: string) {
    return this.http.get(`/v1/staff/brand/review/${id}`)
  }
  // 编辑员工信息
  updateStaffBrandInfo(params: SaveData) {
    return this.http.put(URL, { params })
  }
  // 删除员工
  deleteStaffBrandInfo(id: string) {
    return this.http.delete(`${URL}${id}`)
  }
}
