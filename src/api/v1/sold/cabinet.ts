import { Api } from '../../api'

export interface LeaseParams {
  search: string;
  lease_status: number;
  start_time: string;
  end_time: string;
  size: number;
  page: number;
}

export class CabinetApi extends Api {
  /**
   * 储物柜联动列表
   */
  getCabinetList() {
    return this.http.get(`/v1/sold/cabinet`)
  }
  /**
   * 租赁列表
   */
  getLeaseList(params: LeaseParams) {
    return this.http.get(`/v1/sold/cabinet/lease`, { query: { ...params } })
  }
  /**
   * 续租、转让、退款详情
   */
  getDetail(id: number, type: string) {
    return this.http.get(`/v1/sold/cabinet/${type}/${id}`)
  }

  /**
   * 续租、转让、退款 创建订单
   */
  setTransaction(params:any, type:string, id: number) {
    if (!type) {
      return this.http.put(`/v1/sold/cabinet/${id}`, { params })
    }
    return this.http.put(`/v1/sold/cabinet/${type}/${id}`, { params })
  }
}
