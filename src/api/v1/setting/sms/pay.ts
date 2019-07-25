import { Api } from '@/api/api'

export class PayApi extends Api {
  getInfo() {
    return this.http.get(url)
  }
  update(params: UpdateInput) {
    return this.http.put(url, { params })
  }
}

export interface UpdateInput {
    /**
     * 品牌LOGO
     */
    logo_image: string
    /**
     * 品牌描述
     */
    description: string
  }
