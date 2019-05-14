import { Api } from '@/api/api'
import { remove } from 'lodash-es'

export interface UpdateMemberEdit {
  /**
   * 会员ID
   */
  id: number
  /**
   * 性别
   */
  sex?: string
  /**
   * 生日日期
   */
  birthday?: string
  /**
   * 证件类型
   */
  id_card_type?: string
  /**
   * 证件号
   */
  id_card?: string
  /**
   * 婚姻状况
   */
  married_type?: string
  /**
   * 子女情况
   */
  has_children?: string
  /**
   * 国家Id
   */
  country_id?: string
  /**
   * 民族id
   */
  nation_id?: string
  /**
   * 学历
   */
  education_level?: string
  /**
   * 职业
   */
  jobs?: string
  /**
   * 收入水平
   */
  income_level?: string
  /**
   * 健身目标
   */
  fitness_goal?: string
  /**
   * 健身等级
   */
  fitness_level?: string
  /**
   * 邮箱
   */
  email?: string
  /**
   * 省会id
   */
  province_id?: string
  /**
   * 市区id
   */
  city_id?: string
  /**
   * 区Id
   */
  district_id?: string
}
export interface SetMemberLabel {
  // 标签名
  tag_name: string
}

export interface AddUserParams {
  /**
   * 姓名
   */
  member_name: string
  /**
   * 手机号
   */
  mobile: string
  /**
   * 来源渠道
   */
  register_type: number
  /**
   * 来源方式
   */
  register_way: number
  /**
   * 性别
   */
  sex?: number
  /**
   * 职业
   */
  jobs?: string
  /**
   * 收入水平
   */
  income_level?: string
  /**
   * 证件类型
   */
  id_card_type?: number
  /**
   * 证件号
   */
  id_card?: string
  /**
   * 身高
   */
  height?: string
  /**
   * 体重
   */
  weight?: string
  /**
   * 健身目标
   */
  fitness_goal?: string
  /**
   * 健身等级
   */
  fitness_level?: number
}
export interface SetMemberLabelCreate {
  // 标签名
  id: Array<Number>
  tag_id: Number
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
   * 标签列表(用户添加标签时选择的列表)
   */
  getMemberLableList() {
    return this.http.get(`/v1/member/label/list`)
  }
  /**
   * 标签管理标签添加 v1/member/label
   */
  setMemberLabel(params: SetMemberLabel) {
    return this.http.post(`/v1/member/label`, { params })
  }
  /**
   * 用户添加标签
   */
  setMemberLabelCreate(params: SetMemberLabelCreate) {
    return this.http.post(`/v1/member/label/create`, { params })
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
  /**
   * 绑定实体卡 v1/member/card/会员ID
   */
  getMemberCard(id: string, params: any) {
    return this.http.put(`/v1/member/card/${id}`, { params })
  }
  /**
   * 解除微信绑定
   */
  removeWechatBind(id: number) {
    return this.http.put(`/v1/member/wechat/remove/${id}`)
  }
  /**
   * 用户绑定实体卡信息
   */
  getMemberPhysical(id: number) {
    return this.http.get(`/v1/member/physical/${id}`)
  }
  /**
   * 重绑实体卡
   */
  getMemberPhysicalBind(id: string, params: any) {
    return this.http.put(`/v1/member/physical/bind/${id}`, { params })
  }
  /**
   * 转店用户购买的商品信息v1/member/buy/会员ID
   */
  getMemberBuy(id: number) {
    return this.http.get(`/v1/member/buy/${id}`)
  }
  /**
   * 转店
   */
  getMemberTransfer(params: any) {
    return this.http.put(`/v1/member/transfer`, { params })
  }
  /*
   *员工详情—跟进信息 v1/member/follow/info
   */
  getMemberFollow(id: string) {
    return this.http.get(`/v1/member/follow/info/${id}`)
  }
  /*
   *员工详情—跟进记录 v1/member/follow/record
   */
  getMemberFollowRecord(id: string) {
    return this.http.get(`/v1/member/follow/record/${id}`)
  }
  /**
   * 详情公共头部信息
   */
  getHeaderInfo(id: string) {
    return this.http.get(`/v1/member/common/${id}`)
  }

  /**
   * 详情基础信息
   */
  getBasicInfo(id: string) {
    return this.http.get(`/v1/member/basic/${id}`)
  }
  /**
   * 添加用户跟进记录 v1/member/follow/history/用户ID
   */
  getMemberFollowHistory(id: string, params: any) {
    return this.http.put(`/v1/member/follow/history/${id}`, { params })
  }
  /*
   *员工详情—预约上课v1/member/reserve/员工id
   */
  getMemberReserve(id: string, query: any) {
    console.log(query)
    return this.http.get(`/v1/member/reserve/${id}`, { query })
  }
  /**
   * 卡消费
   */
  getCardConsumption(id: string, query: CardConsumptionQuery) {
    return this.http.get(`/v1/member/card/${id}`, { query })
  }
  /**
   * 课消费
   */
  getCourseConsumption(id: string, query: CourseConsuptionQuery) {
    return this.http.get(`/v1/member/course/${id}`, { query })
  }
}

export interface CourseConsuptionQuery{
  /**
   * 购买日期
   */
  buy_time?: string;
  /**
   * 课程类型
   */
  course_type: number;
  /**
   * 课名称
   */
  keyword?: string;
  /**
   * 每页数量
   */
  size?: number;
  /**
   * 当前页
   */
  page?: number;

}

export interface CardConsumptionQuery {
  /**
   * 卡类型
   */
  card_type: number
  /**
   * 开卡日期
   */
  start_time?: string;
  /**
   * 卡名称
   */
  keyword?: string;
  /**
   * 每页数量
   */
  size?: number;
  /**
   * 当前页
   */
  page?: number;

}
