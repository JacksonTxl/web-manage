import { Api } from '@/api/api'

export class CoachApi extends Api {
  /**
   * 教练等级列表
   */
  getCoachLevelList(query = {}) {
    return this.http.get('/v1/special/coach/level', {
      query: {
        size: 100,
        ...query
      }
    })
  }
}
