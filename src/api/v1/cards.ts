import { Api } from '../api'
export interface CardShelfListInput {
  current_page?:number
  size?:number
  card_type?:number
  publish_channel?:number
  card_name?:string
}
export interface CardListInput {
  current_page?:number
  size?:number
  card_type?:number
  publish_channel?:number
  card_name?:string
  sell_status?:number
  shelf_status?:number
}
export class CardsApi extends Api {
  /**
   * 会员卡已上架列表
   */
  getCardShelfList(query:CardShelfListInput, type:string) {
    return this.http.get(`/v1/cards/member/${type}/shelf`, { query })
  }
  /**
   * 会员卡列表
   */
  getCardList(query:CardListInput, type:string) {
    return this.http.get(`/v1/cards/member/${type}`, { query })
  }
  /**
   * 品牌会员卡上架详情
   */
  getCardShelfInfo(id:string) {
    return this.http.get(`/v1/cards/member/brand/shelf/${id}`)
  }
  /**
   * 品牌会员卡上架
   */
  setCardShelf(params:any, id:string) {
    return this.http.put(`/v1/cards/member/brand/shelf/${id}`, { params })
  }
  /**
   * 会员卡新增
   */
  addCard(params: CardsInput, type:string) {
    return this.http.post(`/v1/cards/member/${type}`, { params })
  }
  /**
   * 会员卡详情
   */
  getCardInfo(id: string, type:string) {
    return this.http.get(`/v1/cards/member/${type}/${id}`)
  }
  /**
   * 会员卡编辑详情
   */
  getCardInfoBack(id: string, type:string) {
    return this.http.get(`/v1/cards/member/${type}/back/${id}`)
  }
  /**
   * 会员卡编辑
   */
  editCard(params: CardsInput, type:string) {
    return this.http.put(`/v1/cards/member/${type}`, { params })
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
   *品牌会员卡停售原因
   */
  getCardsSaleStopReason(query: any) {
    return this.http.get(`/v1/cards/member/brand/sale/stop/${query.card_id}`)
  }
  /**
   *会员卡售卖门店列表
   */
  getCardsSaleShop(query: any) {
    return this.http.get(`/v1/cards/member/sale/shop`, { query })
  }
  /**
   *支持入场门店
   */
  getCardsUseShop(query: any) {
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
  /***
   *  品牌储值卡列表
   */
  getCardsBrandDeposit(query: any) {
    return this.http.get(`/v1/cards/brand/deposit`, { query })
  }
  /***
   *  储值卡消费门店列表
   */
  getCardsDepositConsumeShop(query: any) {
    return this.http.get(`/v1/cards/deposit/consume/shop/${query.card_id}`, { query })
  }
  /***
   *  储值卡卡售卖门店列表
   */
  getCardsDepositSaleShop(query: any) {
    return this.http.get(`/v1/cards/deposit/sale/shop/${query.card_id}`, { query })
  }
  /***
   *   储值卡停售
   */
  setCardsDepositStopSell(params: any) {
    return this.http.put(`/v1/cards/stop/deposit/sell`, { params })
  }

  /***
   *   删除储值卡
   */
  getCardsDeposit(id: string) {
    return this.http.delete(`/v1/cards/brand/deposit/${id}`)
  }
  /**
   * 品牌储值卡上架 /v1/cards/member/brand/shelf
   */
  setCardsDepositBrandOnLine(params: any) {
    return this.http.put(`/v1/cards/brand/deposit/online`, { params })
  }
  /**
   *  品牌门店上架储值卡列表
   */
  getCardsShopDeposit(query: any) {
    return this.http.get(`/v1/cards/brand/deposit/shop`, { query })
  }
  /**
   *  品牌储值卡下架
   */
  setCardsDepositBrandOffLine(params: any) {
    return this.http.put(`/v1/cards/shop/deposit/offline`, { params })
  }
  /**
   * 品牌储值卡停售原因
   */
  getCardsBrandDepositStop(query: any) {
    return this.http.get(`/v1/cards/brand/deposit/stop/${query.card_id}`)
  }
  /**
   * 储值卡恢复售卖
   */
  setCardsDepositRestartSell(params: any) {
    return this.http.put('/v1/cards/brand/deposit/recover', { params })
  }
}
export interface CardsInput {
  [propName: string]: any
}
