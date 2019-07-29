import { Api } from '@/api/api'
// 品牌下的营收统计
export class RevenueApi extends Api {
  /**
   * 营收图表 line
   */
  getChart(query: RevenueChartParams) {
    return this.http.get(`/v1/stat/revenue/chart`, { query })
  }
  /**
   * 营收报表
   */
  getData(query: RevenueDataParams) {
    return this.http.get(`/v1/stat/revenue/brand`, { query })
  }
  /**
   * 营收实时
   */
  getDataToady(shopId: number) {
    return this.http.get(`/v1/stat/revenue/brand/today`, { query: { shop: shopId } })
  }
}

export interface RevenueChartParams {
  shop?: number,
  day?: number,
  start_date?:string,
  end_date?:string
}

export interface RevenueDataParams {
  shop?: number,
  page?: number,
  size?: number,
  day?: number,
  start_date?:string,
  end_date?:string
}
