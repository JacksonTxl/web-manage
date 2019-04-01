import { Api } from '../api'

export class ContractApi extends Api {
  getList() {
    return this.http.get('/v1/contract')
  }
  getInfo(query: ContractGetInfoInput) {
    return this.http.get('/v1/contract', { query })
  }
  add(params: ContractInput) {
    return this.http.post('/v1/contract', { params })
  }
  update(params: ContractInput) {
    return this.http.put('/v1/contract', { params })
  }
  getCharterInfo(query: ContractCharterGetInfoInput) {
    return this.http.get('/v1/contract/charter', { query })
  }
  addCharter(params: ContractCharterInput) {
    return this.http.post('/v1/contract/charter', { params })
  }
}

export interface ContractInput {
  /**
   * 合同标题
   */
  contract_title: string
  /**
   * 页面缩放
   */
  contract_page: number
  /**
   * 页面边距
   */
  contract_marget: number
  /**
   * 品牌logo 开启 0 关闭 1 开启
   */
  is_brand_logo: number
  /**
   * 合同编号 开启 0 关闭 1 开启
   */
  is_contract_number: number
  /**
   * 会员照 开启 0 关闭 1 开启
   */
  is_member_pic: number
  /**
   * 会员姓名 开启 0 关闭 1 开启
   */
  is_member_name: number
  /**
   * 会员手机 开启 0 关闭 1 开启
   */
  is_member_mobile: number
  /**
   * 会员卡号 开启 0 关闭 1 开启
   */
  is_member_card: number
  /**
   * 会员性别 开启 0 关闭 1 开启
   */
  is_member_sex: number
  /**
   * 会员身份证号 开启 0 关闭 1 开启
   */
  is_member_id_card: number
  /**
   * 会员家庭住址 开启 0 关闭 1 开启
   */
  is_member_address: number
  /**
   * 销售人员 开启 0 关闭 1 开启
   */
  is_salesman_name: number
  /**
   * 备注信息
   */
  contents: number
}
export interface ContractGetInfoInput {
  id: number
}

export interface ContractCharterGetInfoInput {
  id: number
}

export interface ContractCharterInput {
  /**
   *  合同id
   */
  id: number
  /**
   * 合同章程
   */
  brand_law_content: string
}
