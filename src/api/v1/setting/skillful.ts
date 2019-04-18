import { Api } from '../../api'
const url = '/v1/setting/skillful'

export class SkillfulApi extends Api {
  /**
   * 训练目的列表
   */
  getSkillfulList(query: GetSkillfulListInput) {
    return this.http.get(url, { query })
  }
  /**
   * 新增训练目的
   */
  addSkillful(params: AddSkillfulInput) {
    return this.http.post(url, { params })
  }
  /**
   * 编辑课程类型
   */
  updateSkillful(params: UpdateSkillfulInput) {
    return this.http.put(url, { params })
  }
  /**
   * 删除课程类型
   */
  deleteSkillful(params: DeleteSkillfulInput) {
    return this.http.delete(`${url}/${params.id}`)
  }
}

export interface GetSkillfulListInput {
  page?: number,
  size?: number
}
export interface AddSkillfulInput {
  /**
   * 训练目的名称
   */
  setting_name: string
}
export interface UpdateSkillfulInput {
  /**
   * 编辑课程类型名称
   */
  setting_name: string
}
export interface DeleteSkillfulInput {
  /**
   * 课程类型设置ID
   */
  id: number
}
