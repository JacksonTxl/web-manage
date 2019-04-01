import { Api } from '../api'

export class StaffPubApi extends Api {
  getCountry() {
    return this.http.get('/country/codes')
  }
}
