import { Api } from '../api'

export class CardsApi extends Api {
  /**
   * 会员卡新增,品牌
   */
  addCardBrand(params: CardsInput) {
    return this.http.post('/v1/cards/member/brand', { params })
  }
  /**
   * 会员卡详情
   */
  getCardInfo(id: string) {
    return this.http.get(`/v1/cards/member/brand/${id}`)
  }
  /**
   * 会员卡编辑详情
   */
  getCardInfoBack(id: string) {
    return this.http.get(`/v1/cards/member/brand/back/${id}`)
  }
  /**
   * 会员卡编辑
   */
  editCard(params: CardsInput) {
    return this.http.put('/v1/cards/member/brand', { params })
  }
  /**
   * 储值卡新增,品牌
   */
  addCardsDepositBrand(params: CardsInput) {
    return this.http.post('/v1/cards/brand/deposit', { params })
  }
  /**
   * 储值卡详情,品牌
   */
  getCardDepositInfoBrand(id: string) {
    return this.http.get(`/v1/cards/brand/deposit/${id}`)
  }
  /**
   * 储值卡编辑详情
   */
  getCardDepositInfoBackBrand(id: string) {
    return this.http.get(`/v1/cards/brand/deposit/back/${id}`)
  }
  /**
   * 储值卡编辑
   */
  editCardDepositBrand(params: CardsInput) {
    return this.http.put('/v1/cards/brand/deposit', { params })
  }
  /**
   *获取卡列表
   */
  getCardsList(query: any) {
    return this.http.get('/v1/cards/member/brand', { query })
  }
  /**
   *获取卡列表
   */
  getCardsListA(query: any) {
    return this.http.get('/v1/cards/member/brand', { query })
  }
  /**
   *品牌会员卡停售原因
   */
  getCardsSaleStopReason(query: any) {
    return this.http.get(`/v1/cards/member/brand/sale/stop/${query.card_id}`)
  }
  /**
   *会员卡售卖门店列表
   */
  getCardsSaleStop(query: any) {
    return this.http.get(`/v1/cards/member/sale/shop`, { query })
  }
  /**
   *支持入场门店
   */
  getCardsUseStop(query: any) {
    return this.http.get(`/v1/cards/member/use/shop`, { query })
  }
  /**
   *品牌会员卡停售信息回传
   */
  getCardsSaleInfo(query: any) {
    return this.http.get(`/v1/cards/member/brand/sale/info/${query.card_id}`)
  }
  /**
   *品牌会员卡删除
   */
  getCardsDel(id: string) {
    return this.http.delete(`/v1/cards/member/brand/${id}`)
  }
  /**
   *品牌会员卡停售
   */
  setCardsSaleStop(params: any) {
    return this.http.put('/v1/cards/member/brand/sale/stop', { params })
  }
  /**
   *品牌会员卡恢复售卖
   */
  setCardsSaleRecover(params: any) {
    return this.http.put('/v1/cards/member/brand/sale/recover', { params })
  }
  /**
   *品牌会员卡详情
   */
  getCardsShopShelf(id: string) {
    return this.http.get(`/v1/cards/member/brand/${id}`)
  }
  /**
   *门店会员卡下架/v1/cards/member/shop/shelf/down
   */
  getCardsMemberShopShelfDown(params: any) {
    return this.http.put('/v1/cards/member/shop/shelf/down', { params })
  }
}
export interface CardsInput {
  [propName: string]: any
}
