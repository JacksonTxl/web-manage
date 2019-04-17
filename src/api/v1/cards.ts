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
  addCards(params:any) {
    return this.http.post('/v1/cards', { params })
  }
  /**
   *
   */
  getCardInfo(id:string) {
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
}
export interface CardsInput {
  [propName: string]: any;

}
