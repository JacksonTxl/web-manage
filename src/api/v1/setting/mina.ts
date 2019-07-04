import { Api } from '@/api/api'
export class SettingMinaApi extends Api {
  /**
   * 微信小程序基本信息
   */
  getInfo() {
    return this.http.get('/v1/setting/mina/index')
  }
  /**
   * 授权回调
   */
  callback(params: CallbackParams) {
    return this.http.post('/v1/setting/mina/callback', { params })
  }
  /**
   * 配置微信支付
   */
  saveMch(params: PayConfigForm) {
    return this.http.post('/v1/setting/mina/save_mch', { params })
  }
  /**
   * 查询微信支付配置
   */
  payMch() {
    return this.http.get('/v1/setting/mina/pay_mch')
  }
  /**
   * 小程序提交审核
   */
  subAudit() {
    return this.http.post('/v1/setting/mina/sub_audit')
  }
  /**
   * 查询小程序H5信息
   */
  getH5Info(query: H5Query) {
    return this.http.get('/v1/setting/mina/setting', { query })
  }
  /**
   * 查询教练详情
   */
  getCoachInfo(query: StaffID) {
    return this.http.get('/v1/setting/mina/coach', { query })
  }
  /**
   * 查询底部导航
   */
  getMenu() {
    return this.http.get('/v1/setting/mina/tabbar')
  }
  /**
   * 保存底部导航
   */
  saveMenu(params: Menus) {
    return this.http.post('/v1/setting/mina/tabbar', { params })
  }
  /**
   * 保存设置
   */
  save(params: SaveForm) {
    return this.http.post('/v1/setting/mina/main_set', { params })
  }
}

export interface CallbackParams {
  auth_code: string,
  expires_in: number
}
export interface PayConfigForm {
  mch_name: string,
  mch_id: string,
  key: string
}
export interface H5Query {
  category: number
}
export interface SaveForm {
  is_save: number, // 1保存，2发布
  content: []
}
export interface StaffID {
  staff_id: number[],
}
export interface Menus {
  tabbar: []
}
