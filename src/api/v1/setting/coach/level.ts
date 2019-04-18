import { Api } from '../../../api'
const url = '/v1/setting/coach/levels'

export class CoachLevelApi extends Api {
  /**
   * 训练目的列表
   */
  getCoachLevelList(query: GetCoachLevelListInput) {
    return this.http.get(url, { query })
  }
  /**
   * 新增训练目的
   */
  addCoachLevel(params: AddCoachLevelInput) {
    return this.http.post(url, { params })
  }
  /**
   * 编辑课程类型
   */
  updateCoachLevel(params: UpdateCoachLevelInput) {
    return this.http.put(url, { params })
  }
  /**
   * 删除课程类型
   */
  deleteCoachLevel(params: DeleteCoachLevelInput) {
    return this.http.delete(`${url}/${params.id}`)
  }
}

export interface GetCoachLevelListInput {
  page?: number,
  size?: number
}
export interface AddCoachLevelInput {
  /**
   * 训练目的名称
   */
  setting_name: string
}
export interface UpdateCoachLevelInput {
  /**
   * 编辑课程类型名称
   */
  setting_name: string
}
export interface DeleteCoachLevelInput {
  /**
   * 课程类型设置ID
   */
  id: number
}
