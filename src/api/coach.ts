import { Api } from './api'

export class CoachApi extends Api {
  getCoachList(query: GetCoachListInput) {
    return this.http.get('/coachs', { query })
  }
}

export interface GetCoachListInput {
  /**
   * size
   */
  size?: number
  /**
   * page
   */
  page?: number
}
