import { Api } from '@/api/api'

export class CodeUrlApi extends Api {
  getCodeUrl() {
    return this.http.get('/v1/brand/orcodeurl')
  }
}
