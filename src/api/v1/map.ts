import { Api } from '../api'
export interface MapLocationParams {
  /**
   * IP地址，缺省时会使用请求端的IP
   */
  ip?:string
  /**
   * 开发密钥（Key）
   */
  key:string
  /**
   * 返回格式：支持JSON/JSONP，默认JSON
   */
  output?:string
  /**
   * JSONP方式回调函数
   */
  callback?:()=>{}
}
export class MapApi extends Api {
  /**
   * 获取根据ip定位
   */
  getIPLocation(params: MapLocationParams) {
    return this.http.originalGet(`/_api_map_qq/ws/location/v1/ip?key=${params.key}`)
  }
}
