import { Api } from '@/api/api'
const url = '/v1/setting/skillful'

export class SkillfulApi extends Api {
  /**
   * 擅长项目列表
   */
  getSkillfulList(query: GetSkillfulListInput) {
    return this.http.get(url, { query })
  }
  /**
   * 新增擅长项目
   */
  addSkillful(params: AddSkillfulInput) {
    return this.http.post(url, { params })
  }
  /**
   * 编辑擅长项目
   */
  updateSkillful(params: UpdateSkillfulInput) {
    return this.http.put(`${url}/${params.id}`, { params })
  }
  /**
   * 删除擅长项目
   */
  deleteSkillful(params: DeleteSkillfulInput) {
    return this.http.delete(`${url}/${params.id}`)
  }
}

export interface GetSkillfulListInput {
  page?: number
  size?: number
}
export interface AddSkillfulInput {
  /**
   * 擅长项目名称
   */
  setting_name: string
}
export interface UpdateSkillfulInput {
  /**
   * 擅长项目id
   */
  id: number
  /**
   * 编辑擅长项目名称
   */
  setting_name: string
}
export interface DeleteSkillfulInput {
  /**
   * 擅长项目设置ID
   */
  id: number
}
