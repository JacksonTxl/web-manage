import { Api } from '@/api/api'

export class TooltipApi extends Api {
  /**
   * 帮助信息 tooltip
   */
  getInfo(sn: GetInfoInput) {
    return this.http.get(`/v1/admin/tooltip`, {
      query: {
        sn
      }
    })
  }
  getInvalid() {
    return this.http.get('/v1/admin/invalid/tooltip')
  }
}

export interface GetInfoInput {
  sn: string
}
