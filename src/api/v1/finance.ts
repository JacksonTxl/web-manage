import { Api } from '../api'

export class FinanceAPi extends Api {
  /**
     * 【品牌】底薪模板列表
     */
  getSalaryBasicList(query: SalaryBasicQuery) {
    return this.http.get(`/v1/finance/salary/basic`, { query })
  }
  /**
   * 新增底薪模板
   */
  addTemplate(params: AddTemplateParams) {
    return this.http.post(`/v1/finance/salary/basic`, { params })
  }
  /**
   * 编辑底薪模板
   */
  editTemplate(id: any, params: AddTemplateParams) {
    return this.http.put(`/v1/finance/salary/basic/${id}`, { params })
  }
  /**
   * 删除底薪模板
   */
  deleteTemplate(id: any) {
    return this.http.delete(`/v1/finance/salary/basic/${id}`)
  }

  /**
   * 业绩模板列表
   */
  getPerformanceList(query: SalaryBasicQuery) {
    return this.http.get(`/v1/finance/salary/performance`, { query })
  }

  /**
   * 删除业绩模板
   */
  deletePerformance(id: any) {
    return this.http.delete(`/v1/finance/salary/performance/${id}`)
  }

  /**
   * 新增业绩模板
   */
  addPerformance(params: AddPerformanceParams) {
    return this.http.post(`/v1/finance/salary/performance`, { params })
  }
}
export interface AddPerformanceParams{
  /**
   * 模板名称
   */
  template_name: string;
  /**
   * 业绩类型
   */
  performance_type: number;
  /**
   * 提成模式
   */
  performance_mode: number;
  /**
   * 默认提成
   */
  performance_num: number;
  /**
   * 梯度提成
   */
  gradients: any;
}
export interface AddTemplateParams{
  // 模板名称
  template_name: string;
  // 底薪
  salary: number
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
