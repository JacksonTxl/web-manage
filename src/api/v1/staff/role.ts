import { Api } from '@/api/api'
/**
 *
 *
 * @export
 * @class RoleApi
 * @extends {Api}
 */
export class RoleApi extends Api {
  /**
   * 获取普通员工所有角色列表
   */
  getNormalList() {
    return this.http.get(`/v1/common/role/normal`)
  }
  /**
     * 获取所有角色列表（角色编辑页面）
     */
  getAllList() {
    return this.http.get(`/v1/common/role/all`)
  }
  /**
     * 获取角色初始化菜单权限树
     */
  getInitInfo(query: GetInitInfoPut) {
    return this.http.get(`/v1/common/role/init`, { query })
  }
  /**
     * 获取所有角色列表（角色编辑页面）
     */
  getInfo(query: GetInitInfoPut) {
    return this.http.get(`/v1/common/role/setting/${query.role_id}`)
  }
  /**
   * 添加角色
   */
  add(params: RoleInfo) {
    return this.http.post(`/v1/common/role`, { params })
  }
  /**
   * 删除角色
   */
  del(params: GetInitInfoPut) {
    return this.http.delete(`/v1/common/role/${params.role_id}`)
  }
  /**
   * 编辑角色
   */
  update(params: RoleInfo) {
    return this.http.put(`/v1/common/role/${params.id}`, { params })
  }
}

export interface GetInitInfoPut {
  /**
   * role_id : string
   */
  role_id?: Number | String
}
export interface RoleInfo{
  id?: number
  name: string,
  dole_description: string,
  data_grant: number,
  select_ids: any[],
  department_ids: any[]
}
