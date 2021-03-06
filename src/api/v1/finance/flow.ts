import { Api } from '@/api/api'

export class FlowApi extends Api {
  /**
   * 获取收入流水 -- 门店
   */
  getIncomeListInShop(query: GetListInput) {
    return this.http.get('/v1/finance/flow/shop/income/detail', {
      query
    })
  }
  /**
   * 获取收入流水明细 -- 品牌
   */
  getIncomeList(query: GetListInput) {
    return this.http.get('/v1/finance/flow/income/detail', { query })
  }
  /**
   * 获取收入流水汇总 -- 品牌
   */
  getIncomeSummaryList(query: any) {
    return this.http.get('/v1/finance/flow/income/summary', { query })
  }
  /**
   * 获取支出流水 -- 门店
   */
  getExpenditureListInShop(query: GetListInput) {
    return this.http.get('/v1/finance/flow/shop/expenditure/detail', {
      query
    })
  }
  /**
   * 获取支出流水 -- 品牌
   */
  getExpenditureList(query: GetListInput) {
    return this.http.get('/v1/finance/flow/expenditure/detail', {
      query
    })
  }
  /**
   * 获取支出流水汇总 -- 品牌
   */
  getExpenditureSummaryList(query: any) {
    return this.http.get('/v1/finance/flow/expenditure/summary', {
      query
    })
  }
  /**
   * 获取流水的支付列表
   */
  getPaymentMethodList() {
    return this.http.get(`/v1/finance/flow/payment/method`)
  }
}
export interface GetListInput {
  reserve_type: number
  start_time: string
  end_time: string
}
