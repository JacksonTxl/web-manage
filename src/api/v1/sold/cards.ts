import { Api } from '../../api'

export interface GetMemberListInput {
  search?: string
  is_valid?: number
  card_type?: number
  card_status?: number
  is_open?: number
  start_time?: string
  end_time?: string
  size?: number
  page?: number
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
  refund_price: number
  refund_reason: number
  refund_channel: number
  description?: string
}
export interface FreezeCardInput {
  end_time: string
  poundage?: number
  pay_method?: number
}
export interface CardVipInput {
  id: Array<number | string>
  vip_id: Array<number | string>
}
export interface CardSettingTimeInput {
  time: string
  description?: string
}
export interface CardGiveInput {
  sold_card_ids: Array<number | string>
  gift_quota: number
  description?: string
}
export interface RenewalCardInput {
  contract_number: string
  rule_id: number
  gift_amount?: number
  user_coupon_id?: number | string
  advance_id?: string
  reduce_price?: number
  description?: string
  staff_sale_id: number
  contract_type: number
  discounts_price?: number
}

export interface GetRenewalTaskNumInput {
  search?: string
  card_type?: number
  card_status?: number
  is_open?: number
  start_time?: string
  end_time?: string
}

export interface TaskExtendDaysInput {
  sold_ids: number[]
  extend_days: number
  batch_type: number
  content: string
  conditions: object
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
  editCardTransfer(params: TransferCardInput, id: string, type: string) {
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
  editCardRefund(params: RefundCardInput, id: string, type: string) {
    return this.http.put(`/v1/sold/cards/${type}/refund/${id}`, { params })
  }
  /*
   * 售出 储值卡/会员卡 详情
   */
  getCardInfo(id: string, type: string) {
    return this.http.get(
      `/v1/sold/cards/${type}/${type === 'member' ? 'info' : 'detail'}/${id}`
    )
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
  unFreezeCard(id: string, type: string) {
    return this.http.put(`/v1/sold/cards/${type}/cancel/freeze/${id}`)
  }
  /**
   * 售出 会员卡/储值卡 详情消费记录
   */
  getCardsConsumeInfo(id: string, type: string) {
    return this.http.get(`/v1/sold/cards/${type}/consume/record/${id}`)
  }
  /**
   * 售出 会员卡/储值卡 详情操作日志
   */
  getCardsOperationInfo(query: any, type: string) {
    return this.http.get(`/v1/sold/cards/${type}/operation/log/${query.id}`, {
      query
    })
  }
  /**
   * 售出 会员卡 详情使用记录
   */
  getCardsUsageLog(query: any, type: string) {
    return this.http.get(`/v1/sold/cards/${type}/usage/log/${query.id}`, {
      query
    })
  }
  /**
   * 售出 储值卡 详情使用记录
   */
  getDepositUsageLog(query: any) {
    return this.http.get(`/v1/cards/brand/deposit/cost`, {
      query
    })
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
  getCardVipArea(id: string) {
    return this.http.get(`/v1/sold/cards/member/vip/info/${id}`)
  }
  /**
   * 售出 会员卡修改vip区域
   */
  setCardVipArea(params: CardVipInput) {
    return this.http.put(`/v1/sold/cards/member/vip`, { params })
  }
  /**
   * 售出 会员卡批量修改vip区域
   */
  setCardVipAreaBatch(params: CardVipInput) {
    return this.http.post(`/v1/sold/cards/batch/vip_area`, { params })
  }
  /**
   * 售出 会员卡 设置有效日期
   */
  setCardSettingTime(params: CardSettingTimeInput, id: string) {
    return this.http.put(`/v1/sold/cards/member/setting/${id}`, { params })
  }
  /**
   * 售出 会员卡 批量赠送
   */
  setCardGive(params: any) {
    return this.http.post(`/v1/sold/cards/batch/amount`, { params })
  }
  /**
   * 售出 会员卡 续卡回显
   */
  getCardRenewalInfo(id: string) {
    return this.http.get(`/v1/sold/cards/member/renewal/info/${id}`)
  }
  /**
   * 售出 会员卡 续卡
   */
  setCardRenewal(params: RenewalCardInput, id: string) {
    return this.http.put(`/v1/sold/cards/member/renewal/${id}`, { params })
  }
  /**
   * 售出 会员卡 升级回显
   */
  getCardUpgradeInfo(id: string) {
    return this.http.get(`/v1/sold/cards/member/upgrade/info/${id}`)
  }
  /**
   * 售出 会员卡 升级
   */
  setCardUpgrade(params: any, id: string) {
    return this.http.put(`/v1/sold/cards/member/upgrade/${id}`, { params })
  }
  /**
   * 门店可售卖的会员卡列表
   */
  getCardUpgradeList(card_name_search?: string, card_number_type = -1) {
    return this.http.get(`/v1/sold/cards/shop/saled_card`, {
      query: { card_name_search, card_number_type }
    })
  }
  /**
   * 获取会员卡可使用条数
   */
  fetchSoldCardValidNum(query: any) {
    return this.http.get(`/v1/sold/cards/batch/count`, {
      query
    })
  }
  /**
   * 获取会员卡 vip 区域和入场时间可使用条数
   */
  fetchSoldCardVIPOrTimeValidNum(query: any) {
    return this.http.get(`/v1/sold/cards/batch/num`, {
      query
    })
  }
  /**
   * 售出 会员卡 批量更改入场时间
   */
  setCardEnterTime(params: any) {
    return this.http.post(`/v1/sold/cards/batch/admission_time`, { params })
  }
  /**
   * 售出 会员卡 更改成员
   */
  changeCardMember(id: number, params: any) {
    return this.http.put(`/v1/sold/cards/member/cards/edit/${id}`, { params })
  }
  /**
   * 获取批量延期会员卡查询总数
   */
  getRenewalTaskNum(query: GetRenewalTaskNumInput) {
    return this.http.get('/v1/sold/cards/batch/renewal/task_num', { query })
  }
  /**
   * 售出会员卡延长有效期
   */
  taskExtendDays(params: TaskExtendDaysInput) {
    return this.http.post('/v1/sold/cards/batch/renewal', {
      params
    })
  }
}
