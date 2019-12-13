import { Api } from '@/api/api'

export class StoreApi extends Api {
  /**
   * 数据概况
   */
  dataProfile() {
    return this.http.get('/v1/store/data_profile')
  }
}
