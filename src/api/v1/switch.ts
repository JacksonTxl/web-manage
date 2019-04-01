import { Api } from '../api'

export class SwitchApi extends Api {
  getList() {
    return this.http.get('/v1/account/switch/index')
  }
  switchBrand(params: SwitchBrandInput) {
    return this.http.post('/v1/account/switch/brand', params)
  }
}

export interface SwitchBrandInput {}
