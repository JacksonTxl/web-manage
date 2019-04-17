import { Api } from '../../api'

export class TrainingApi extends Api {
  /**
   * 课程类型列表
   */
  getTrainingAims() {
    return this.http.get('/v1/setting/training')
  }
  /**
   * 新增训练目的
   */
  addTrainingAim(params: AddTrainingAimInput) {
    return this.http.post('/v1/setting/training', { params })
  }
}

export interface AddTrainingAimInput {
  /**
   * 训练目的名称
   */
  setting_name: string
}
