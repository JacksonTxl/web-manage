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

  /**
  * 售出会员卡冻结回显  v1/sold/cards/member/freeze/info/商品ID
  */
  getMemberFreezeInfo(id: string, type: string) {
    return this.http.get(`/v1/sold/cards/${type}/freeze/info/${id}`)
  }

  /* 合同编号自动生成 v1/setting/contract/codenumber/模板TYPE */
  settingContractCodenumber(type: string) {
    return this.http.get(`/v1/setting/contract/codenumber/${type}`)
  }
}
