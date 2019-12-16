import { Api } from '@/api/api'

export interface DtoreBoard {
  date_type: string
  date: string
}
export class StoreApi extends Api {
  /**
   * 数据概况
   */
  dataProfile() {
    return this.http.get('/v1/store/data_profile')
  }
  /**
   * 整体看板
   */
  storeBoard(params: DtoreBoard) {
    return this.http.get('/v1/store/board', {
      params
    })
  }
}
