import { Api } from '@/api/api'
const url = '/v1/setting/course/pricing'
export class CoursePricingApi extends Api {
  /**
   * 获取课程定价设置信息
   */
  getInfo() {
    return this.http.get(url)
  }
  update(params: UpdateInput) {
    return this.http.put(url, { params })
  }
}

export interface UpdateInput {
  /**
   * 售卖模式: 1 教练谈单 2 统一标价
   */
  sale_model: number,
  /**
   * 定价模式: 1 教练统一定价 2 教练分级定价
   */
  price_model: number,
  /**
   * 最低价下调百分比
   */
  min_price_percent: number,
  /**
   * 最高价上调百分比
   */
  max_price_percent: number,
  /**
   * 标准价设置：0 最低价 1 最高价
   */
  standard_price: number
}
