import { Api } from '@/api/api'

export class SalaryApi extends Api {
  /**
   * 获取薪资列表
   * @param query
   */
  getList(query: any) {
    return this.http.get('/v1/stat/salary/brand', { query })
  }
  /**
   * 获取上课提成列表
   * @param query
   */
  getClassCommissionList(query: any) {
    return this.http.get(
      `/v1/stat/salary/brand/course_commissions/${query.monthly_summary_id}`,
      { query }
    )
  }
  /**
   * 获取销售提成列表
   * @param query
   */
  getSaleCommissionList(query: any) {
    return this.http.get(
      `/v1/stat/salary/brand/sale_commissions/${query.monthly_summary_id}`,
      { query }
    )
  }
  /**
   * 获取员工所属门店
   * @param query
   */
  getStaffShopList(query: any) {
    return this.http.get(
      `/v1/stat/salary/staff_shop/${query.monthly_summary_id}`,
      { query }
    )
  }
}
