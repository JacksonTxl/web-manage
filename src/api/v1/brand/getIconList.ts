import { Api } from '@/api/api'

export class IconUrlApi extends Api {
  getIconList() {
    return this.http.get('/v1/brand/iconlist')
  }
}
