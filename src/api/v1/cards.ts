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
export interface CardSaleStopInput {
  reason: string
}
export interface CardSaleRecoverInput {
  start_time:string
  end_time:string
}
export interface BrandShelfDownCardShopInput {
  card_id: number
  shop_id: number
}
export interface BrandCardShelfDownInput {
  card_shop: Array<BrandShelfDownCardShopInput>
}
export class CardsApi extends Api {
  /**
   * 卡已上架列表
   */
  getCardShelfList(query:CardShelfListInput, type:string, cardType:string) {
    return this.http.get(`/v1/cards/${cardType}/${type}/shelf`, { query })
  }
  /**
   * 卡列表
   */
  getCardList(query:CardListInput, type:string, cardType:string) {
    return this.http.get(`/v1/cards/${cardType}/${type}`, { query })
  }
  /**
   * 卡上架详情
   */
  getCardShelfInfo(id:string, type:string, cardType:string) {
    return this.http.get(`/v1/cards/${cardType}/${type}/shelf/${id}`)
  }
  /**
   * 卡上架
   */
  setCardShelf(params:any, id:string, type:string, cardType:string) {
    return this.http.put(`/v1/cards/${cardType}/${type}/shelf/${id}`, { params })
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
   * 储值卡新增
   */
  addCardsDeposit(params: CardsInput, type:string) {
    return this.http.post(`/v1/cards/${type}/deposit`, { params })
  }
  /**
   * 储值卡详情
   */
  getCardDepositInfo(id: string, type:string) {
    return this.http.get(`/v1/cards/${type}/deposit/${id}`)
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
  editCardDeposit(params: CardsInput, type:string) {
    return this.http.put(`/v1/cards/${type}/deposit`, { params })
  }
  /**
   *会员卡售卖门店列表
   */
  getCardsSaleShop(query: any) {
    return this.http.get(`/v1/cards/member/sale/shop`, { query })
  }
  /**
   * 支持入场门店
   */
  getCardsUseShop(query: any) {
    return this.http.get(`/v1/cards/member/use/shop`, { query })
  }
  /**
   * 卡停售信息回传
   */
  getCardSaleStopInfo(id:string, type:string, cardType:string) {
    return this.http.get(`/v1/cards/${cardType}/${type}/sale/info/${id}`)
  }
  /**
   * 卡停售
   */
  setCardsSaleStop(params: CardSaleStopInput, id:string, type:string, cardType:string) {
    return this.http.put(`/v1/cards/${cardType}/${type}/stop/${id}`, { params })
  }
  /**
   * 获取服务器系统时间
   */
  getServiceTime() {
    return this.http.get(`/time`)
  }
  /**
   * 卡恢复售卖
   */
  setCardsSaleRecover(params: CardSaleRecoverInput, id:string, type:string, cardType:string) {
    return this.http.put(`/v1/cards/${cardType}/${type}/recover/${id}`, { params })
  }
  /**
   *  卡删除
   */
  setCardsDelete(id: string, type:string, cardType:string) {
    return this.http.delete(`/v1/cards/${cardType}/${type}/${id}`)
  }
  /**
   * 卡下架
   */
  setCardsShelfDown(id: string, type:string, cardType:string) {
    return this.http.put(`/v1/cards/${cardType}/${type}/shelf/down/${id}`)
  }
  /***
   *  品牌会员卡下架
   */
  setBrandCardsShelfDown(params: BrandCardShelfDownInput) {
    return this.http.put(`/v1/cards/member/brand/shelf/down`, { params })
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
  /**
   * 储值卡上架
   */
  setCardsDepositShelf(id:string, type:string) {
    return this.http.put(`/v1/cards/deposit/${type}/shelf/${id}`)
  }
}
export interface CardsInput {
  [propName: string]: any
}
