import { Api } from '@/api/api'

export interface UpdateMemberEdit {
    /**
     * 会员ID
     */
    id: number;
    /**
     * 性别
     */
    sex?: string;
    /**
     * 生日日期
     */
    birthday?: string;
    /**
     * 证件类型
     */
    id_card_type?: string;
    /**
     * 证件号
     */
    id_card?: string;
    /**
     * 婚姻状况
     */
    married_type?: string;
    /**
     * 子女情况
     */
    has_children?: string;
    /**
     * 国家Id
     */
    country_id?: string;
    /**
     * 民族id
     */
    nation_id?: string;
    /**
     * 学历
     */
    education_level?: string;
    /**
     * 职业
     */
    jobs?: string;
    /**
     * 收入水平
     */
    income_level?: string;
    /**
     * 健身目标
     */
    fitness_goal?: string;
    /**
     * 健身等级
     */
    fitness_level?: string;
    /**
     * 邮箱
     */
    email?: string;
    /**
     * 省会id
     */
    province_id?: string;
    /**
     * 市区id
     */
    city_id?: string;
    /**
     * 区Id
     */
    district_id?: string;
}

export interface AddUserParams{
  /**
   * 姓名
   */
  member_name: string;
  /**
   * 手机号
   */
  mobile: string;
  /**
   * 来源渠道
   */
  register_type: number;
  /**
   * 来源方式
   */
  register_way: number;
  /**
   * 性别
   */
  sex? : number;
  /**
   * 职业
   */
  jobs? : string;
  /**
   * 收入水平
   */
  income_level? : string;
  /**
   * 证件类型
   */
  id_card_type? : number;
  /**
   * 证件号
   */
  id_card? : string;
  /**
   * 身高
   */
  height? : string;
  /**
   * 体重
   */
  weight? : string;
  /**
   * 健身目标
   */
  fitness_goal? : string;
  /**
   * 健身等级
   */
  fitness_level? : number;
}
export class MemberAPi extends Api {
  /**
         * 用户编辑回显
         */
  getMemberEdit(id: number) {
    return this.http.get(`/v1/member/info/${id}`)
  }
  /**
         * 提交用户信息编辑
         */
  updateMemberEdit(id: string, params: UpdateMemberEdit) {
    return this.http.put(`/v1/member/${id}`, { params })
  }

  /**
       * 会员列表
       */
  getMember(query: any) {
    return this.http.get(`/v1/member`, { query })
  }
  /**
   * 添加员工
   */
  addUser(params: AddUserParams) {
    return this.http.post(`/v1/member`, { params })
  }
  /**
     * 国籍
     */
  getCountries() {
    return this.http.get(`/countries`)
  }
  /**
     * 民族
     */
  getNations() {
    return this.http.get(`/nations`)
  }
}
