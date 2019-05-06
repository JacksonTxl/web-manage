import { Api } from '@/api/api'
/**
 * 帮助
 */
export class HelpApi extends Api {
  getHelp(id: GetHelpInput) {
    return this.http.get(`/v1/help/${id}`, { mock: {} })
  }
}
export interface GetHelpInput {
  id: number
}
