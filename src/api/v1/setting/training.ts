import { Api } from '../../api'
const url = '/v1/setting/training'

export class TrainingApi extends Api {
  /**
   * 训练目的列表
   */
  getTrainingAimList(query: GetTrainingAimListInput) {
    return this.http.get(url, { query })
  }
  /**
   * 新增训练目的
   */
  addTrainingAim(params: AddTrainingAimInput) {
    return this.http.post(url, { params })
  }
  /**
   * 编辑课程类型
   */
  updateTrainingAim(params: UpdateTrainingAimInput) {
    return this.http.put(url, { params })
  }
  /**
   * 删除课程类型
   */
  deleteTrainingAim(params: DeleteTrainingAimInput) {
    return this.http.delete(`${url}/${params.id}`)
  }
}

export interface GetTrainingAimInput {
  page?: number,
  size?: number
}
export interface AddTrainingAimInput {
  /**
   * 训练目的名称
   */
  setting_name: string
}
export interface UpdateTrainingAimInput {
  /**
   * 编辑课程类型名称
   */
  setting_name: string
}
export interface DeleteTrainingAimInput {
  /**
   * 课程类型设置ID
   */
  id: number
}
