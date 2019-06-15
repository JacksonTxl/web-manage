import { Api } from '../api'

export class FinanceApi extends Api {
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

  /**
   * 业绩模板详情
   * @param id 模板id
   */
  getPerformanceInfo(id: any) {
    return this.http.get(`/v1/finance/salary/performance/${id}`)
  }

  /**
   * 编辑业绩模板
   * @param id 模板id
   * @param params
   */
  editPerformance(id: any, params: AddPerformanceParams) {
    return this.http.put(`/v1/finance/salary/performance/${id}`, { params })
  }

  /**
   * 业绩模板查看应用员工
   */
  getSearchStaffListPerformance(id:any, query: SalaryBasicQuery) {
    return this.http.get(`/v1/finance/salary/performance/staff/${id}`, { query })
  }

  /**
   * 底薪模板查看应用员工
   */
  getSearchStaffListSalary(id:any, query: SalaryBasicQuery) {
    return this.http.get(`/v1/finance/salary/basic/staff/${id}`, { query })
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
