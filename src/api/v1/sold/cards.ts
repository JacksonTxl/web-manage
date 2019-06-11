import { Api } from '../../api'

export interface GetMemberListInput {
  search?: string,
  is_valid?: number,
  card_type?: number,
  card_status?: number,
  is_open?: number,
  start_time?: string,
  end_time?: string,
  size?: number,
  page?: number,
}
export interface TransferCardInput {
  transferee_member_id?: number
  member_name?: string
  mobile?: number
  remain_price: number
  contract_number: string
  pay_channel?: number
  contract_type: number
}

export interface RefundCardInput {
  refund_price:number
  refund_reason:number
  refund_channel:number
  description?:string
}
export interface FreezeCardInput {
  end_time:string
  poundage?:number
  pay_method?:number
}
export interface CardVipInput {
  id: Array<number|string>
  vip_id: Array<number|string>
}
export interface CardSettingTimeInput {
  time:string
  description?:string
}
export class CardApi extends Api {
  /**
   * 会员卡列表
   */
  getMemberList(params: GetMemberListInput, type: string) {
    return this.http.get(`/v1/sold/cards/${type}`, { query: params })
  }
  /**
  * 售出 储值卡 转让回显
  */
  getCardTransferInfo(id: string, type: string) {
    return this.http.get(`/v1/sold/cards/${type}/transfer/info/${id}`)
  }
  /*
  * 售出 储值卡 转让
  */
  editCardTransfer(params:TransferCardInput, id:string, type:string) {
    return this.http.put(`/v1/sold/cards/${type}/transfer/${id}`, { params })
  }
  /**
   * 售出 储值卡 退款回显
   */
  getCardRefundInfo(id: string, type: string) {
    return this.http.get(`/v1/sold/cards/${type}/refund/info/${id}`)
  }
  /*
  * 售出 储值卡 退款
  */
  editCardRefund(params:RefundCardInput, id:string, type:string) {
    return this.http.put(`/v1/sold/cards/${type}/refund/${id}`, { params })
  }
  /*
  * 售出 储值卡/会员卡 详情
  */
  getCardInfo(id:string, type:string) {
    return this.http.get(`/v1/sold/cards/${type}/${type === 'member' ? 'info' : 'detail'}/${id}`)
  //  return this.http.get(`/v1/sold/cards/${type}/detail/${id}`)
  }
  /**
   * 售出 会员卡 冻结回显
   */
  getMemberFreezeInfo(id: string) {
    return this.http.get(`/v1/sold/cards/member/freeze/info/${id}`)
  }
  /**
   * 售出 会员卡 冻结
   */
  editMemberFreeze(params: FreezeCardInput, id: string) {
    return this.http.put(`/v1/sold/cards/member/freeze/${id}`, { params })
  }
  /**
   * 取消冻结售出 会员卡/储值卡
   */
  unFreezeCard(id:string, type:string) {
    return this.http.put(`/v1/sold/cards/${type}/cancel/freeze/${id}`)
  }
  /**
   * 售出 会员卡/储值卡 详情消费记录
   */
  getCardsConsumeInfo(id:string, type:string) {
    return this.http.get(`/v1/sold/cards/${type}/consume/record/${id}`)
  }
  /**
   * 售出 会员卡/储值卡 详情操作日志
   */
  getCardsOperationInfo(id:string, type:string) {
    return this.http.get(`/v1/sold/cards/${type}/operation/log/${id}`)
  }
  /**
   * 售出 会员卡 设置有效日期回显
   */
  getCardSettimeInfo(id: string) {
    return this.http.get(`/v1/sold/cards/member/setting/info/${id}`)
  }
  /**
   * 售出 vip区域 列表
   */
  getCardVipAreaList() {
    return this.http.get('/v1/sold/cards/member/vip')
  }
  /**
   * 售出 会员卡 vip区域
   */
  getCardVipArea(id:string) {
    return this.http.get(`/v1/sold/cards/member/vip/info/${id}`)
  }
  /**
   * 售出 会员卡修改vip区域
   */
  setCardVipArea(params:CardVipInput) {
    return this.http.put(`/v1/sold/cards/member/vip`, { params })
  }
  /**
   * 售出 会员卡 设置有效日期
   */
  setCardSettingTime(params:CardSettingTimeInput, id:string) {
    return this.http.put(`/v1/sold/cards/member/setting/${id}`, { params })
  }

  /* 合同编号自动生成 v1/setting/contract/codenumber/模板TYPE */
  settingContractCodenumber(type: string) {
    return this.http.get(`/v1/setting/contract/codenumber/${type}`)
  }
}
