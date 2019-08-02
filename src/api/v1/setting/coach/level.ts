import { Api } from '@/api/api'
const url = '/v1/setting/coach'

export class CoachLevelApi extends Api {
  /**
   * 教练等级列表
   */
  getCoachLevelList(query: GetCoachLevelListInput = {}) {
    return this.http.get(url, {
      query: {
        size: 100,
        ...query
      }
    })
  }
  /**
   * 教练等级列表
   */
  getCoachLevelListAll() {
    return this.http.get(`${url}/all`)
  }
  /**
   * 新增教练等级
   */
  addCoachLevel(params: AddCoachLevelInput) {
    return this.http.post(url, { params })
  }
  /**
   * 编辑教练等级
   */
  updateCoachLevel(params: UpdateCoachLevelInput) {
    return this.http.put(`${url}/${params.id}`, { params })
  }
  /**
   * 删除教练等级
   */
  deleteCoachLevel(params: DeleteCoachLevelInput) {
    return this.http.delete(`${url}/${params.id}`)
  }
}

export interface GetCoachLevelListInput {
  page?: number
  size?: number
}
export interface AddCoachLevelInput {
  /**
   * 教练等级名称
   */
  setting_name: string
}
export interface UpdateCoachLevelInput {
  /**
   * 教练等级id
   */
  id: number
  /**
   * 教练等级名称
   */
  setting_name: string
}
export interface DeleteCoachLevelInput {
  /**
   * 教练等级设置ID
   */
  id: number
}
