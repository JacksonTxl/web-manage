import { Api } from '../api'

export class CardsApi extends Api {
  /**
   * 会员卡新增,品牌
   */
  addCardsBrand(params:CardsInput) {
    return this.http.post('/v1/cards/brand', { params })
  }
  /**
   * 会员卡详情
   */
  getCardInfo(id: string) {
    return this.http.get(`/v1/cards/${id}`)
  }
  /**
   * 会员卡编辑详情
   */
  getCardInfoBack(id: string) {
    return this.http.get(`/v1/cards/back/${id}`)
  }
  /**
   * 会员卡编辑
   */
  editCards(params:CardsInput) {
    return this.http.put('/v1/cards', { params })
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
    console.log('会员卡售卖门店列表', query)
    return this.http.get(`/v1/cards/sale/shop`, { query })
  }
  /**
   *支持入场门店
   */
  getCardsUseStop(query: any) {
    console.log('支持入场门店', query)
    return this.http.get(`/v1/cards/use/shop`, { query })
  }
}
export interface CardsInput {
  [propName: string]: any
}
