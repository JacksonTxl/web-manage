import { Api } from '../api'

export class CardsApi extends Api {
  /**
   * 获取默认卡背景
   */
  getCardsBgList() {
    return this.http.get('/v1/cards/bg_list', { mock: {} })
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
}
