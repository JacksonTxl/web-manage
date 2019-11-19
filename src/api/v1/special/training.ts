import { Api } from '@/api/api'

export class TrainingApi extends Api {
  /**
   * 训练目的列表
   */
  getTrainingAimList(query = {}) {
    return this.http.get('/v1/special/training/setting', {
      query: Object.assign(
        {
          size: 100
        },
        query
      )
    })
  }
}
