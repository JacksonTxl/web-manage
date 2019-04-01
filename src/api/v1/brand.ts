import { Api } from '../api'

export class BrandApi extends Api {
  getInfo() {
    return this.http.get('/v1/brand')
  }
  update(params: BrandInput) {
    return this.http.put('/v1/brand', { params })
  }
}

export interface BrandInput {
  /**
   * 品牌LOGO
   */
  logo_image: string
  /**
   * 品牌描述
   */
  description: string
}
