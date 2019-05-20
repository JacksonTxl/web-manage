import { Api } from '../api'

export class FinanceAPi extends Api {
  /**
     * 【品牌】底薪模板列表
     */
  getSalaryBasicList(query: SalaryBasicQuery) {
    return this.http.get(`/v1/finance/salary/basic`, { query })
  }
}
export interface SalaryBasicQuery{
    /**
     * 页码
     */
    page? : number;
    /**
     * 每页数量
     */
    size? : number;
}
