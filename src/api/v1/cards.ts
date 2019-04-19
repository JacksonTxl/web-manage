import { Api } from '../api'
import { Params } from './staff'

export class CardsApi extends Api {
  /**
   * 会员卡新增,品牌
   */
  addCardsBrand(params: CardsInput) {
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
  editCards(params: CardsInput) {
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
   *会员卡删除
   */
  getCardsDel(id: string) {
    console.log('id', id)
    return this.http.delete(`/v1/cards/${id}`)
  }
  /**
   *填写会员卡停售
   */
  setCardsSaleStop(params: any) {
    return this.http.put('/v1/cards/sale/stop', { params })
  }
  /**
   *会员卡恢复售卖
   */
  setCardsSaleRecover(params: any) {
    return this.http.post('/v1/cards/sale/recover', { params })
  }
}
export interface CardsInput {
  [propName: string]: any
}
