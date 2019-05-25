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

export class CardApi extends Api {
  /**
   * 会员卡列表
   */
  getMemberList(params: GetMemberListInput, type: string) {
    return this.http.get(`/v1/sold/cards/${type}`, { query: params })
  }
  /**
  * 转让回显  v1/sold/cards/deposit/transfer/info/商品ID
  */
  getMemberTransferInfo(id: string, type: string) {
    return this.http.get(`/v1/sold/cards/${type}/transfer/info/${id}`)
  }
  /*
  *储值卡转让 v1/sold/cards/deposit/transfer/商品ID
  */
  putMemberTransferInfo(id: string, type: string, params: any) {
    return this.http.put(`/v1/sold/cards/${type}/transfer/${id}`, { params })
  }
  /* 合同编号自动生成 v1/setting/contract/codenumber/模板TYPE */
  settingContractCodenumber(type: string) {
    return this.http.get(`/v1/setting/contract/codenumber/${type}`)
  }
}
