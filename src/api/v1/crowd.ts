import { Api } from '../api'

export class CrowdAPI extends Api {
  /* 获取新增界面初始值 v1/crowd/field get */
  getCrowdShopField() {
    return this.http.get(`/v1/crowd/shop/field`)
  }
  /* 获取新增界面初始值 v1/crowd/field get */
  getCrowdBrandField() {
    return this.http.get(`/v1/crowd/brand/field`)
  }
  /* 品牌新增人群v1/crowd/brand */
  setCrowdBrandField(params: any) {
    return this.http.post(`/v1/crowd/brand`, { params })
  }
}
