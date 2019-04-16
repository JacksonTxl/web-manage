import { Api } from './api'

export class ConstApi extends Api {
  getEnum() {
    return this.http.get('/const/enum', { mock: {} })
  }
}
