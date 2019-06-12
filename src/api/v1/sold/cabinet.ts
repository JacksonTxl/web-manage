import { Api } from '../../api'

export class CabinetApi extends Api {
  /**
   * 储物柜联动列表
   */
  getCabinetList() {
    return this.http.get(`/v1/sold/cabinet`)
  }
}
