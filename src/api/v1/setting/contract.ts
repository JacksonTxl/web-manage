import { Api } from '../../api'

export class ContractApi extends Api {
  /**
   * 合同模版列表
   */
  getList() {
    return this.http.get('/v1/setting/contract', { mock: {} })
  }
  /**
   * 合同模版信息
   */
  getInfo(id: number) {
    return this.http.get(`/v1/setting/contract/${id}`)
  }
  /**
   * 合同设置更新
   */
  update(params: ContractInput) {
    return this.http.put('/v1/setting/contract', { params })
  }
  add(params: ContractInput) {
    return this.http.post('/v1/setting/contract', { params })
  }
  /**
   * 获取合同章程
   */
  getConstitutionInfo(id: number) {
    return this.http.get(`/v1/setting/contract/constitution-details/${id}`)
  }
  /**
   * 更新合同章程
   */
  updateConstitution(params: ContractConstitutionInput) {
    return this.http.put('/v1/setting/contract/constitution-edit', { params })
  }
  /**
   * 获取合同编码信息
   */
  getCodeInfo(id: number) {
    return this.http.get(`/v1/setting/contract/code/${id}`)
  }
  /**
   * 更新合同编号
   */
  updateCode(params: ContractCodeInput) {
    return this.http.put('/v1/setting/contract/code-edit', { params })
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

export interface ContractConstitutionInput {
  /**
   *  合同id
   */
  id: number
  /**
   * 合同章程
   */
  brand_law_content: string
}

export interface ContractCodeInput {
  /**
   * 合同编码位置号ID 新增位数则填 0 编辑已有位数规则则填 ID
   */
  id: number
  /**
   * 合同ID
   */
  contract_template_id: number
  /**
   * 合同编号位置号
   */
  sn_pos: number
  /**
   * 合同位规则: 1 字母Ａ-Z ２ 数据 0-9
   */
  sn_rule: number
  /**
   * 合同生成规则: 1随机生成 2固定生成
   */
  sn_generate_rule: number
  /**
   * 固定生成时的值
   */
  sn_generate_value: number
  /**
   * 状态0:未删除；1：已删除
   */
  is_del: number
}
