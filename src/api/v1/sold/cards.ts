import { Api } from '../../api'

export interface GetMemberListInput {
  search?:string,
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
  getMemberList(params:GetMemberListInput, type:string) {
    return this.http.get(`/v1/sold/cards/${type}`, { query: params })
  }
}
