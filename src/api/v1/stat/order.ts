import { Api } from '@/api/api'
// 品牌下的营收统计
export class OrderApi extends Api {
  /**
   * 营收图表
   */
  getChart(query: OrderChartParams) {
    return this.http.get(`/v1/stat/order/chart`, { query })
  }
  /**
   * 营收报表
   */
  getData(query: OrderDataParams) {
    return this.http.get(`/v1/stat/order/brand`, { query })
  }
}

export interface OrderChartParams {
  shop?: number,
  day?: number,
  start_date?:string,
  end_date?:string
}

export interface OrderDataParams {
  shop?: number,
  page?: number,
  size?: number,
  day?: number,
  start_date?:string,
  end_date?:string
}
