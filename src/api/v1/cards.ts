import { Api } from '../api'

export class CardsApi extends Api {
  /**
   * 获取默认卡背景
   */
  getCardsBgList() {
    return this.http.get('/v1/cards/bg_list', { mock: {} })
  }
  /**
   * 会员卡新增
   */
  addCards(params:CardsInput) {
    return this.http.post('/v1/cards', { params })
  }
  /**
   * 会员卡编辑
   */
  editCards(params:CardsInput) {
    return this.http.put('/v1/cards', { params })
  }
  /**
   *
   */
  getCardInfo(id: string) {
    return this.http.get(`/v1/cards/${id}`)
  }
  /**
   *获取卡列表
   */
  getCardsList(query: any) {
    return this.http.get('/v1/cards', { query })
  }
  /**
   *获取卡列表
   */
  getCardsListA(query: any) {
    return this.http.get('/v1/cards/shelf', { query })
  }
  /**
   *会员卡停售原因
   */
  getCardsSaleStopReason(query: any) {
    return this.http.get(`/v1/cards/sale/stop/reason`, { query })
  }
  /**
   *会员卡售卖门店列表
   */
  getCardsSaleStop(query: any) {
    return this.http.get(`/v1/cards/sale/shop`, { query })
  }
  /**
   *支持入场门店
   */
  getCardsUseStop(query: any) {
    return this.http.get(`/v1/cards/use/shop`, { query })
  }
  /**
   *会员卡停售信息
   */
  getCardsSaleInfo(query: any) {
    return this.http.get(`/v1/cards/sale/info`, { query })
  }
  /**
   *会员卡删除(未)
   */
  getCardsDel(params: any) {
    return this.http.delete(`/v1/cards`, { params })
  }
}
export interface CardsInput {
  [propName: string]: any
}
