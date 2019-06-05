import { Api } from '../../api'

export class StoredValueCardApi extends Api {
  /**
  * 售出 交易签单 储值卡
  */
  getStoredValueCardInfo(id: number) {
    return this.http.get(`/v1/order/transaction/deposit?order_id=${id}`)
  }
}
